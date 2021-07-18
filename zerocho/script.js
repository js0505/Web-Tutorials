const players = document.querySelector('.players');
const nowPlayer = document.querySelector('.order');
const wordPresenter = document.querySelector('.word');
const wordInput = document.querySelector('.word-input');
const button = document.querySelector('button');
const game = true;

const player = parseInt(prompt('참가인원'))

const setPlayer = () => {
    players.textContent = `총 ${player}명의 참가자`
}

if (typeof player === 'number') {
    setPlayer()
}

let word;

if (wordPresenter.textContent === '') {
    word = prompt('제시어를 입력 하세요');
    wordPresenter.textContent = word;
}

// 대기



button.addEventListener('click', function (e) {
    e.preventDefault()

    let confirmWord = wordInput.value;
    
    if (word[word.length - 1] === confirmWord[0]) {
        word = confirmWord;
        wordPresenter.textContent = word;
        wordInput.value = "";
        wordInput.focus()
        
        const nowPlayerNumber = parseInt(nowPlayer.textContent);

        if (nowPlayerNumber + 1 <= player) {
            nowPlayer.textContent =  nowPlayerNumber + 1
        } else {
            nowPlayer.textContent = 1;
        }

    } else {
        alert(`
        player ${nowPlayer.textContent} loose!
        Game Over
        `)
    }
    
})


