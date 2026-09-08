class Rizzler {
    rizz() {
        return "Sticking out your gyatt for the rizzler.";
    }
};

const skibidiGood = {
  obj: new Rizzler(),
  print: function () {setTimeout(() => {
    console.log(this.obj.rizz());
  }, 1000)}
};

const skibidiBad = {
  obj: new Rizzler(),
  print: function () {setTimeout(function () {
    console.log(this.obj.rizz());
  }, 1000)}
};

skibidiGood.print();
