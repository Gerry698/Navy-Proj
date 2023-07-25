
// Arrays of compliments for each theme
const themes = {
    default: [
      "You are amazing, ",
      "You look fantastic today, ",
      "You have a great smile, ",
      "You're doing an excellent job, ",
      "Your creativity knows no bounds, ",
      "You're a true inspiration, ",
      "You're so kind and thoughtful, ",
      "Your hard work is paying off, ",
      "You're a wonderful person, ",
      "You're a ray of sunshine, "
      // Add more compliments for theme1
    ],
    pickup: [
        "Do you have a map? Because I keep getting lost in your eyes, ",
        "Are you a magician? Because whenever we hang out, time disappears, ",
        "If you were a vegetable, you'd be a 'cute-cumber', ",
        "Is your name Google? Because you've got everything I've been searching for, ",
        "Are you made of copper and tellurium? Because you're Cu-Te, ",
        "Do you believe in love at first sight, or should we be friends for a while longer, ",
        "If you were a dessert, you'd be a 'sweet-tart', ",
        "I must be a snowflake because I've fallen for you, ",
        "Do you have a name, or can I call you 'mine', ",
      // Add more compliments for theme2
    ],
    punny: [
        "You're soda-lightful, and I'm not just fizz-ing around, ",
        "You're one in a melon, my dear watermelon-loving friend, ",
        "You're tea-rrific! Brew-tiful inside and out, ",
        "You're a-maize-ing! I'm corn-pletely in awe of you, ",
        "I'm soy into your friendship! You're the tofu to my stir-fry, ",
        "You're the pun-damental ingredient to our friendship, ",
        "You're a total quack-up! Our jokes are always duck-tastic, ",
        "You're a real smarty-pants! Thanks for always being so sharp, ",
        "You're so pun-derful! I'm knot kidding, ",
        "You're the sunshine in my life - sunny-side up and all smiles, ",
        "You're a berry good friend - the blue to my raspberry, ",
        "You're a-maze-ing! You always find your way straight to my heart, ",
        "You're a real gem - pun in a million, ",
        "You're purr-fectly punny! Your jokes always make me smile, ",
        "You're a real slice! Our friendship is like a pizza - always better when shared, "
      // Add more compliments for theme3
    ],
    mrmike: [
        "You're cruising through this, ",
        "You're so efficient, it's like magic, ",
        "Ben bought cookies, you all can have a piece. Especially you, ",
        "So, what we wanna say is... that you're awesome, ",
        "So... let's do this. Say that you are amazing, "
      // Add more compliments for theme4
    ]
  };
  
  // Function to generate a random compliment based on the selected theme and user name
  function generateCompliment() {
    const themeSelector = document.getElementById('themeSelector');
    const selectedTheme = themeSelector.value;
    const compliments = themes[selectedTheme];
  
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value || "Friend"; // Use "Friend" if no name is provided
  
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const compliment = compliments[randomIndex] + name + "!";
      //show mr mike
      const theme4Image = document.getElementById("mrmikeImage");
        if (selectedTheme === "mrmike") {
            theme4Image.classList.remove('hidden');
        } else {
            theme4Image.classList.add('hidden');
        }
    return compliment;
  }
  
  // Function to display the compliment on the webpage
  function displayCompliment() {

    const complimentText = document.getElementById('complimentText');
    complimentText.textContent = generateCompliment();
  }

  
  // Event listener for the "Deal" button
  const dealButton = document.getElementById('dealButton');
  dealButton.addEventListener('click', displayCompliment);

