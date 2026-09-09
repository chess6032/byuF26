function announce(msg, ...people) {
  people.forEach((person) => {
    console.log(`${msg}: ${person}`);
  });
}

announce("NOW ENTERING", "Caleb", "Lotus", "Eve");