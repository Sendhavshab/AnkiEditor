import { Component } from "react";
import { CodeContextHOC } from "../HOC&Context/Context";

type P = {
  jsCode: string;
  cssCode: string;
  htmlCode: string;
  runJs: boolean;
};

class Output extends Component<P> {


  


  render() {


   


    return (
      <div className="w-full h-full">
        <iframe
          title="output"
          srcDoc={`
            <html>
              <head>
                <style>${this.props.cssCode}</style>
              </head>
              <body>
              <div>${this.props.htmlCode}</div>
              <script>
 
  
                ${this.props.runJs && this.props.jsCode}
              
            
              </script>
              </body>
            </html> 
          `}
          width="100%"
          height="100%"
          sandbox="allow-scripts allow-modals"
        ></iframe>
      </div>
    );
  }
}

export default CodeContextHOC(Output);
