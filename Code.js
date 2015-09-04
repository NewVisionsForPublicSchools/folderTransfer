var PAGETITLE = PropertiesService.getScriptProperties().getProperty('pageTitle');



function doGet() {
  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle(PAGETITLE);
}



function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}



function transferFolderFiles(formObj){
  var test, folderId, user, folder, files, newFolderName, newFolder, html;
  
  folderId = formObj.folder;
  user = formObj.newOwner;
  
  folder = DriveApp.getFolderById(folderId);
  files = folder.getFiles();
  
  newFolderName = 'Transferred on ' + new Date();
  newFolder = DriveApp.createFolder(newFolderName);
  
  while (files.hasNext()) {
   var file = files.next();
   newFolder.addFile(file);
   file.setOwner(user);
 }
  
  newFolder.setOwner(user);
  
  html = HtmlService.createTemplateFromFile('results');
  html.folderName = newFolderName;
  html.user = user;
  return html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).getContent();
}