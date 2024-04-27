import { Component } from "react";

type P = {
  jsCode: String;
  cssCode: String;
  htmlCode: String;
  reloadJs:boolean;
};

class Output extends Component<P> {


  

  shouldComponentUpdate(nextProps: Readonly<P>): boolean {
     console.log(
       "shouldComponentUpdate",
       nextProps.reloadJs,
       nextProps.jsCode.indexOf("props")
     );
       if (nextProps.reloadJs === true || nextProps.jsCode.indexOf("prompt") === -1) {
         return true;
       }
    return false
  }



  render() {
    console.log("render run");

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
                ${this.props.jsCode}
              
            
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

export default Output;
