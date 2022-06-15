/* 
#C = # of clubs
#D = # of diamonds
#H = # of hearts
#S = # of spades
*/
/* VARIABLES */
let deck = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];
let playerPoints = 0,
    computerPoints = 0;
/* HTML REFERENCES */
const btnNewGame = document.querySelector("#btnNewGame");
const btnRequestCart = document.querySelector("#btnRequestCart");
const btnStop = document.querySelector("#btnStop");
const pointsHTML = document.querySelectorAll("small");
const divPlayerCarts = document.querySelector("#player-carts");
const divComputerCarts = document.querySelector("#computer-carts");
const message = document.querySelector("#message");
console.log(message);
console.log(divPlayerCarts);
btnStop.disabled = true;
/* FUNCTIONS */
const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type);
        }
    }
    for (let type of types) {
        for (let special of specials) {
            deck.push(special + type);
        }
    }
    //console.log(deck);
    deck = _.shuffle(deck);
    //console.log(deck);
    return deck;
};
createDeck();
//Function to request a cart
const requestCart = () => {
    if (deck.length === 0) {
        throw "Empty deck";
    }
    //return deck.shift();//for queues
    return deck.pop(); //for stacks
};

//pedirCarta();
const valueCart = (cart) => {
    const value = cart.substring(0, cart.length - 1);
    // let points = 0;
    // switch (value) {
    //     //Add special case to change its value
    //     case "A":
    //         points = 11;
    //         break;
    //     case "J":
    //     case "Q":
    //     case "K":
    //         points = 10;
    //         break;
    //     default:
    //         points = value * 1;
    //         break;
    // }

    //console.log({ value, points });
    //return points;
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};
// COMPUTER IA
const computersTurn = () => {
    do {
        const cart = requestCart();
        computerPoints += valueCart(cart);

        pointsHTML[1].innerText = computerPoints;
        //<img class="carta" src="assets/carts/3C.png" />
        const imgCart = document.createElement("img");
        imgCart.src = `assets/carts/${cart}.png`;
        imgCart.classList.add("carta");
        divComputerCarts.append(imgCart);
    } while (!(computerPoints >= playerPoints) && playerPoints <= 21);
    setTimeout(() => {
        if (
            (playerPoints > 21 && computerPoints > 21) ||
            computerPoints === playerPoints
        ) {
            //console.log("tie");
            //alert("tie");
            const messageG = document.createElement("h1");
            messageG.innerText = "TIE";
            message.append(messageG);
        } else if (
            playerPoints > 21 ||
            (computerPoints >= playerPoints && computerPoints <= 21)
        ) {
            //console.log("loser");
            //alert("You lose");
            const messageG = document.createElement("h1");
            messageG.innerText = "LOSER";
            message.append(messageG);
        } else {
            //console.log("winner");
            //alert("You win!");
            const messageG = document.createElement("h1");
            messageG.innerText = "WINNER";
            message.append(messageG);
        }
    }, 100);
};
/* EVENTS */
/* REQUEST A CART */
btnRequestCart.addEventListener("click", () => {
    btnStop.disabled = false;
    const cart = requestCart();
    playerPoints += valueCart(cart);

    pointsHTML[0].innerText = playerPoints;
    const imgCart = document.createElement("img");
    imgCart.src = `assets/carts/${cart}.png`;
    imgCart.classList.add("carta");
    divPlayerCarts.append(imgCart);

    if (playerPoints > 21 || playerPoints === 21) {
        btnRequestCart.disabled = true;
        btnStop.disabled = true;
        computersTurn();
    } else if (playerPoints === 21) {
        btnRequestCart.disabled = true;
        btnStop.disabled = true;
        computersTurn();
    }
});
/* RESTART GAME */
btnNewGame.addEventListener("click", () => {
    //document.location.reload(true);
    deck = createDeck();
    playerPoints = 0;
    computerPoints = 0;
    pointsHTML[0].innerText = pointsHTML[1].innerText = 0;
    divComputerCarts.innerHTML = "";
    divPlayerCarts.innerHTML = "";
    btnRequestCart.disabled = false;
    //btnStop.disabled = true;
    message.innerHTML = "";
});
/* STOPS PLAYER'S TRY */
btnStop.addEventListener("click", () => {
    btnRequestCart.disabled = true;
    btnStop.disabled = true;
    computersTurn();
});
