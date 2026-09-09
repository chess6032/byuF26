const { exec } = require('child_process');

const [ , , cmd, ...args ] = process.argv;

if (cmd == undefined) {
    console.error("No command given");
    process.exit(1);
}

exec(`${cmd} ${args.join(' ')}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`ERR: ${error.mesasge}`);
        return;
    }
    if (stderr) {
        console.error(`STDERR: ${stderr}`);
    }

    console.log(stdout);
});

