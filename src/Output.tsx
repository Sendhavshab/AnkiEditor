import { Component } from "react";

type P = {
  jsCode: String;
  cssCode: String;
  htmlCode: String;
  reloadJs:boolean;
};

class Output extends Component<P> {


  

  shouldComponentUpdate(nextProps: Readonly<P>): boolean {
  
       if (nextProps.reloadJs === true || nextProps.jsCode.indexOf("props") === -1) {
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
              <body>${this.props.htmlCode}
              
              <script>
              function root(){
                ${this.props.jsCode}
              }
              root()
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
