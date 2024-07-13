export function createJsonFile(data: any, name: string): File {
  const fileName = `${name}.json`;
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const file = new File([blob], fileName, { type: "application/json" });

  return file;
}
