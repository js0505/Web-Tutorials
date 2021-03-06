const $order = document.querySelector('.order'); // 참가자
const $word = document.querySelector('.word'); // 제시어
const $input = document.querySelector('.word-input'); // 입력창
const $submit = document.querySelector('.submit') // 입력버튼

// 참가 인원수를 Number로 변환
// 숫자가 아니면 NaN 반환.
let players = Number(prompt('참가자는 몇 명 입니까?'));

// 참가자 입력이 NaN이 아닌 경우 정상적으로 게임실행
if (players) {
    //인풋에 입력되는 단어
    let newWord;

    //입력마다 단어를 저장하는 배열
    const saveWord = [];

    //입력 들어오면 newWord에 현재 입력값 저장.
    $input.addEventListener('input', (e) => {
        newWord = e.target.value
    })

    $submit.addEventListener('click', () => {
        if (newWord.length > 3 || newWord.length < 3) {
            alert('3글자만 입력 가능합니다.')
            $input.value = "";
            $input.focus()
        } else {
            //제시어가 비어있거나, 제시어의 마지막 글자와 현재 입력값의 첫 글자가 같다면
            if ($word.textContent === "" || $word.textContent[$word.textContent.length - 1] === newWord[0]) {
                
                //이미 제시된 단어인지 확인
                if (saveWord.includes(newWord, 0)) {
                    alert('이미 제시된 단어입니다.')
                    $input.focus()
                    
                } else {
                    saveWord.push(newWord); // 새 단어를 배열에 저장
                    $word.textContent = newWord; // 제시어에 단어 업데이트
                    $input.value = ""; // 입력창 초기화
                    $input.focus() //입력창 포커싱. 다음 입력 용이

                    //다음 순서 검사
                    if (parseInt($order.textContent) < players) {
                        //현재 순서가 총 인원 수 보다 작으면
                        //현재 순서 + 1
                    $order.textContent = parseInt($order.textContent) + 1;
                    } else {
                        //현재 순서가 총 인원수를 넘어가면 
                        // 다시 첫번째로.
                        $order.textContent = 1;
                    }
                }
            } else {
                alert('잘못된 입력입니다.')
                $input.value = "";
                $input.focus()
            }
        }
    })
} else {
    //참가 인원이 정수가 아니거나 취소 한 경우
    //경고를 띄우고 페이지 새로고침.
    alert('참가 인원수를 정수로 입력 해주세요.')
    window.location.reload()
}

