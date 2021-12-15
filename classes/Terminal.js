class Terminal {
  constructor(dataJson) {
    this.currData = {};
    this.requiredData = dataJson;
  }

  parse(c) {
    let cmd = cmd.split(" ");

    switch (cmd[0]) {
      case "git":
        this.git(...cmd);
        break;
      case "cd":
        this.cd(...cmd);
        break;
      case "ls":
        this.ls(...cmd);
        break;
      case "h":
        this.h(...cmd);
        break;
      case "cat":
        this.currData(...cmd);
        break;
      case "exit":
        this.exit(...cmd);
        break;
      default:
        break;
    }
  }
}
