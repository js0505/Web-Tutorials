let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++){
    //accordion 클래스 3개의 길이..동안? 계속 반복되는 건가

    //각 button마다 이벤트 리스너를 실행
    acc[i].addEventListener("click", function() {
        //active가 있으면 빼고, 없으면 넣고 'toggle'
        this.classList.toggle("active");

        //현재 나타내는 클래스의 다음 element를 선택
        let panel = this.nextElementSibling;

        //panel 클래스의 스타일 내에 max-height의 여부에 따라 동작.
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            //max-height가 false일 때(버튼이 켜지지 않았을 때)

            //max-height값 만큼 scroll-height를 넣어준다.
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    
    });
}