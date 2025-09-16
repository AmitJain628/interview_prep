const wait = (name, ms = 500) => () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Running ${name}`);
      resolve();
    }, ms)
  );

  const tasks = {
    a: {run: wait("A")},
    c: {run: wait("A")},
    d: {run: wait("A")},
    e: {run: wait("A"),  dependsOn: ["a", "b"]},
    f: {run: wait("A"),  dependsOn: ["d", "c"]}
  }

  class TaskRunner {
  constructor(tasks) {
    this.tasks = tasks;
    this.completed = {};
    }

 async run(task) {
    if (!this.completed[task]) return;

    const deps = task.dependsOn || [];

    for (let dep of deps) {
        await this.run(dep);
    }

    await task.run();
    this.completed[task] = true;
 }

  async runAll() {
    for (let task in this.tasks) {
        await this.run(task)
    }
  }
}