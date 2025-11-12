import JSZip from "jszip";
import { getFromServerApi } from "../Api/ApiCall";
import { Folder } from "../HOC&Context/Provider/FolderInfoProvider";
import { GetCode } from "../HOC&Context/Provider/CodeStore";
import { generateRandomString } from "./RandomStr";

export interface ProjectData {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
  createdAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
}

const createIndexHtml = (
  html: string,
  cssPath: string,
  jsPath: string
): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project</title>
    <link rel="stylesheet" href="${cssPath}">
</head>
<body>
${html}
    <script src="${jsPath}"></script>
</body>
</html>`;
};

export const downloadAllProjects = async (
  folders: Folder,
  setLoading: (loading: boolean) => void,
  setShowAlert: (alert: {
    value: number;
    type: string;
    message: string;
  }) => void,
  showAlert: { value: number; type: string; message: string }
): Promise<void> => {
  try {
    setLoading(true);

    const projects: ProjectData[] = [];
    const folderNames = Object.keys(folders);

    if (folderNames.length === 0) {
      setShowAlert({
        value: showAlert.value + 1,
        type: "warning",
        message: "No projects found to download",
      });
      setLoading(false);
      return;
    }

    for (const folderName of folderNames) {
      const folder = folders[folderName];
      const folderId = folder.id;

      try {
        let projectData: ProjectData | null = null;

        const localCode = GetCode(folderId);
        if (localCode && localCode.code) {
          projectData = {
            id: folderId,
            name: folderName,
            html: localCode.code.html || "",
            css: localCode.code.css || "",
            js: localCode.code.js || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isPublished: folder.saved || false,
          };
        } else if (folder.saved) {
          const serverData = await getFromServerApi(folderId);
          if (serverData && serverData.data) {
            projectData = {
              id: folderId,
              name: folderName,
              html: serverData.data.html || "",
              css: serverData.data.css || "",
              js: serverData.data.js || "",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isPublished: true,
            };
          }
        }

        if (projectData) {
          projects.push(projectData);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(`Error fetching project ${folderName}:`, errorMessage);
      }
    }

    if (projects.length === 0) {
      setShowAlert({
        value: showAlert.value + 1,
        type: "warning",
        message: "No projects with code found to download",
      });
      setLoading(false);
      return;
    }

    const zip = new JSZip();

    const ckData = {
      version: "1.0",
      exported_at: new Date().toISOString(),
      projects: projects.map((project) => ({
        id: project.id,
        name: project.name,
        created_at: project.createdAt || new Date().toISOString(),
        updated_at: project.updatedAt || new Date().toISOString(),
        is_published: project.isPublished || false,
      })),
    };

    zip.file("ck.json", JSON.stringify(ckData, null, 2));

    for (const project of projects) {
      const randomId = generateRandomString(19);
      const projectFolder = zip.folder(randomId);

      if (projectFolder) {
        const cssPath = "style.css";
        const jsPath = "script.js";

        projectFolder.file(
          "index.html",
          createIndexHtml(project.html, cssPath, jsPath)
        );
        projectFolder.file("style.css", project.css || "");
        projectFolder.file("script.js", project.js || "");
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "codekings-projects.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowAlert({
      value: showAlert.value + 1,
      type: "success",
      message: `Successfully downloaded ${projects.length} project(s)`,
    });

    setLoading(false);
  } catch (error) {
    setLoading(false);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to download projects";
    setShowAlert({
      value: showAlert.value + 1,
      type: "error",
      message: errorMessage,
    });
  }
};
