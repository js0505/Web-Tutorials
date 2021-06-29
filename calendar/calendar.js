//현재 날짜, 시간 정보
let date = new Date();

//지난달, 이번달, 다음달 표시하는 달력 만들 내용.
const prevMonth = () => {
    //기존에 선언된 오늘 날짜에서 -1월 해서 달력 함수 실행
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}

const nextMonth = () => {
    //기존에 선언된 오늘 날짜에서 +1월 해서 달력 함수 실행
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}

const goToday = () => {
    //얘 때문에 맨 위에 date 선언할 때 let으로.
    date = new Date();
    renderCalendar();
}


const renderCalendar = () => {
        //fullyear으로 받아와야 두자릿수 연도수를 받아오지 않는다.
    const viewYear = date.getFullYear();
    //1월은 0, 2월은 1 로 받아오기 때문에 후에 +1을 해줘야 현재 월을 나타낼 수 있다.
    const viewMonth = date.getMonth();


    //year-month 클래스의 div 안에 데이터 삽입.
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`


    //현재 연도, 달, 0을 넣으면 지난달 마지막 날의 객체가 생성된다.
    // getDate : 1~31 사이의 일 을 반환
    // getDay : 일0 월1 화2 수3 목4 금5 토6을 나타내는 요일 값을 반환.
    // 항상 첫 날은 일요일이고, 바꿀 수 없다.
    const prevLast = new Date(viewYear, viewMonth, 0);
    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();


    //이번 달의 마지막 날
    const thisLast = new Date(viewYear, viewMonth + 1, 0);
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();


    //전 월의 날짜를 담을 배열
    //다음달의 날짜를 담을 배열

    //이번달 데이터 인데
    // Array(n)으로 배열을 만들면 길이가 n인 배열이 모든 요소가 undef 상태로 생성됨
    // 거기에 keys() 를 쓰면 길이가 정해진 배열 내의 각 인덱스 키 값이 반복되어 생성되고
    // 그냥 쓰면 바보가 되니 전개 문법(...)를 써서 모든 값들을 다 집어넣고
    // 0부터 값이 생성 되므로 +1을 한 뒤에 slice로 앞에 0을 없애면
    // thisDates 는 이번달이 30일 까지라면
    // 1~30까지 의 값이 들어있는 배열이 생성된다.
    const prevDates = [];
    const nextDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);

    //나머지 배열 채우기
    //전 달의 요일이 토요일이면 이번달 첫 날이 일요일이라 첫번째 칸에 채워 지므로 넘어가고
    //그렇지 않으면 반복문 실행.
    if (PLDay !== 6) {
        //0부터 지난달 마지막 요일까지 반복문을 실행
        for (let i = 0; i < PLDay + 1; i++) { 
            //지난달 마지막 날짜부터 1씩 줄어든 값을 배열 앞쪽에 채워넣는다.
            prevDates.unshift(PLDate - i);
        }
    }

    //이번달 마지막 날짜의 요일을 기준으로 뒤로 필요한 개수를 파악해서
    // 1부터 1씩 증가 시키며 배열에 하나씩 채워 넣는다.
    // 그럼 다음달 날짜 부분에 1, 2, 3 ... 순으로 나타나게 됨.
    for (let i = 1; i < 7 - TLDay; i++){
        nextDates.push(i);
    }

    //이전 날짜들 배열부터 차례대로 날짜들을 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    // indexOf 에서 '1'을 찾아서 몇번째 값인지 찾아내고
    const firstDateIndex = dates.indexOf(1);
    //lastIndexOf로 뒤에서 이번달의 마지막날 값을 찾는다.
    const lastDateIndex = dates.lastIndexOf(TLDate);



    // forEach(item, index, array) 
    // 삼항 연산자로 반복문이 돌 때 마다 condition에 
    // 이번달의 첫 날보다 이전에 있는 값들은 other
    // 범위안에 들지 않는 이번달의 값들은 this 를 할당해서
    // 매번 class에 값을 추가.
    // 이후 css에서 other 값에 투명도 설정 하기 위함.
    // span 으로 따로 글자를 빼야 테두리 말고 글자만 투명도 설정을 할 수 있기 때문에.
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
        dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`
    })

    // dates 배열에 join 메서드로 ',' 없이 값을 입력. 
    document.querySelector('.dates').innerHTML = dates.join('');

    // 오늘 날짜 표시 그리기

    //현재 시간 데이터를 새로 하나 받고
    const today = new Date();

    // 위에 선언된 현재 월, 년 데이터를 비교해서 지금 보는 달력이 현재 달력이 맞다면 반복문 실행
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        // this 클래스로 나눠놓은 '모든' 클래스 태그를 찾아서 반복
        for (let date of document.querySelectorAll('.this')) {
            //숫자로 변경한 태그 내부의 데이터가 오늘의 날짜와 같은 데이터라면
            if (+date.innerText === today.getDate()) {
            //해당 태그에 today 클래스를 추가.
            date.classList.add('today');
            // 찾았으니 종료.
            break;
            }
        }
    }

}



//기본 달력 실행함수
renderCalendar();