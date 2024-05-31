

export function storeCode(code : {[key:string] : string} , id : string): void {

  localStorage.setItem(
    id + "code",
    JSON.stringify({
      code: code,
    })
  );
}

export function GetCode(id:string) {

 return JSON.parse(localStorage.getItem(id + "code") || '{}')
}
