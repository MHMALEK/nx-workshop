import { Tree, formatFiles, installPackagesTask, updateJson } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, { name: schema.name });
  updateJson
  console.log(name);
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
