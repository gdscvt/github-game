class Terminal {
  constructor(dataJson) {
    // requiredData contains tha translated json file into json object
    this.requiredData = dataJson[0];

    // files contains the array of files from the dataJson
    // url contains the url of the folder from the dataJson
    // currDir contains the files of the current directory; will change
    // when cd is used and stuff
    [this.files, this.url, this.currDir] = [
      dataJson[0].files,
      dataJson[0].url,
      dataJson[0].files,
    ];
    this.toPush = [];
    console.log(this.files);
  }

  parse(c) {
    computer.display += "\n" + c + "\n";
    let cmd = c.split(" ");
    console.log(cmd);

    switch (cmd[1]) {
      case "git":
        this.git(...cmd);
        break;
      case "cd":
        if (cmd.length > 3)
          computer.display +=
            "\nError using cd, only supply one [args], and it must be a folder";
        else this.cd(cmd[2]);
        break;
      case "ls":
        this.ls(this.currDir);
        break;
      case "h":
        this.h(...cmd);
        break;
      case "cat":
        if (cmd.length > 3)
          computer.display += "\nError using cat, only supply one [args]";
        else this.cat(cmd[2]);
        break;
      case "exit":
        this.exit();
        break;
      default:
        computer.display += "\nNo such cmd found! :<\n";
        break;
    }

    computer.code = "> ";
  }

  git(c) {
    let cmd = c.split(" ");
    switch (cmd[3]) {
      case "add":
        break;
      case "push":
        break;
      case "commit":
        break;
      default:
        computer.display += "No such cmd found! :<\n";
        break;
    }
  }

  cd(folder) {
    if (folder === "..") {
      if (directoryPath.length == 1) {
        computer.display += "You're already at the base directory\n";
        return;
      }

      this.currDir = this.files;

      computer.display += "Back to base directory!\n";
      return;
    }

    let newDir;
    this.currDir.forEach((curr) => {
      let currFileName = Object.keys(curr)[0];
      if (currFileName === folder) {
        // does things to cd into new dir
        directoryPath = `/${folder}/`;
        newDir = curr[folder];
        computer.display += `Now at ${directoryPath}\n`;
      }
    });
    if (newDir !== undefined) this.currDir = newDir;
  }

  cat(file) {
    console.log(file);
    if (!file.includes(".")) {
      computer.display += "\nUse cat on files, not directories!\n";
      return;
    }
    this.currDir.forEach((curr) => {
      let currFileName = Object.keys(curr)[0];
      if (currFileName === file) computer.display += curr[currFileName];
    });
  }

  ls(files) {
    console.log(files);
    files.forEach((file) => {
      let currFileName = Object.keys(file);
      computer.display += `${currFileName}\n`;
    });
  }

  exit() {
    computerToggle = false;
    computer.display = "";
  }
}
