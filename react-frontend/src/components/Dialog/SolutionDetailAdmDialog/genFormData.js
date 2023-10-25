export const genFormData = (result) => {
    let bodyFormData = {};   

    bodyFormData["uuidSolution"] = result.uuidSolution;
    bodyFormData["roleName"] = 'ADMIN';   
    bodyFormData["tags"] = result.tagsAdmList;
    
    let json = JSON.stringify(bodyFormData ).replace(/\+/g,"%2B");

    return json;
  };