document.addEventListener('DOMContentLoaded', function() {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // FAQアコーディオン機能
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // アクティブクラスの切り替え
                question.classList.toggle('active');
                
                // 回答の表示/非表示を切り替え
                const answer = question.nextElementSibling;
                if (answer.classList.contains('show')) {
                    answer.classList.remove('show');
                } else {
                    answer.classList.add('show');
                }
            });
        });
    }

    // 診断アプリの初期化
    initYogaQuiz();
});

// 診断アプリの実装
function initYogaQuiz() {
    // 診断の質問と回答を管理する変数
    const quizContainer = document.getElementById('yoga-quiz');
    if (!quizContainer) return;

    let currentQuestion = 0;
    let answers = [];
    
    const questions = [
        {
            question: "朝の目覚めについて",
            options: [
                "朝スッキリ起きられないことがよくある",
                "目覚めは悪くないが、日中だるさを感じることがある",
                "毎日気持ちよく起きられている"
            ]
        },
        {
            question: "体の凝りや不調について",
            options: [
                "肩や首がガチガチで、いつも重く感じる",
                "特定の箇所が時々凝るが、ストレッチで和らぐ",
                "特に体の凝りは感じない"
            ]
        },
        {
            question: "心の状態、ストレスについて",
            options: [
                "仕事や人間関係でストレスを感じやすく、イライラすることが多い",
                "ストレスはあるが、気分転換で解消できている",
                "比較的穏やかに過ごせている"
            ]
        },
        {
            question: "運動習慣について",
            options: [
                "ほとんど運動する機会がなく、運動不足を感じている",
                "たまに体を動かすが、継続はできていない",
                "定期的に運動している"
            ]
        },
        {
            question: "自分の時間について",
            options: [
                "自分のための時間がほとんど取れず、いつも時間に追われている",
                "たまには自分の時間を作れている",
                "十分に自分の時間を楽しめている"
            ]
        }
    ];

    // 診断開始ボタンのイベントリスナー
    const startButton = document.getElementById('start-quiz');
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }

    // 診断を開始する関数
    function startQuiz() {
        answers = [];
        currentQuestion = 0;
        showQuestion();
    }

    // 質問を表示する関数
    function showQuestion() {
        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];
            
            let html = `
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    <div class="options">
            `;
            
            q.options.forEach((option, index) => {
                html += `
                    <div class="option">
                        <input type="radio" name="q${currentQuestion}" id="q${currentQuestion}o${index}" value="${index}">
                        <label for="q${currentQuestion}o${index}">${option}</label>
                    </div>
                `;
            });
            
            html += `
                    </div>
                    <button id="next-question" class="btn">次へ</button>
                </div>
            `;
            
            quizContainer.innerHTML = html;
            
            document.getElementById('next-question').addEventListener('click', () => {
                const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
                if (selected) {
                    answers.push(parseInt(selected.value));
                    currentQuestion++;
                    showQuestion();
                } else {
                    alert('選択肢を選んでください');
                }
            });
        } else {
            showResult();
        }
    }

    // 結果を表示する関数
    function showResult() {
        // Aの回答（0）の数をカウント
        const countA = answers.filter(a => a === 0).length;
        // Bの回答（1）の数をカウント
        const countB = answers.filter(a => a === 1).length;
        // Cの回答（2）の数をカウント
        const countC = answers.filter(a => a === 2).length;
        
        let resultType, resultTitle, resultDescription, resultImage, resultAdvice;
        
        // 最も多い回答タイプに基づいて結果を決定
        if (countA >= countB && countA >= countC) {
            resultType = "A";
            resultTitle = "心身SOS！溜め込みがちな休息必須タイプ";
            resultImage = "Photo/Gemini_Generated_Image_avv5j1avv5j1avv5.png";
            resultDescription = "毎日の忙しさに追われ、心も体も悲鳴をあげているようです。肩や首の凝りがひどく、ストレスも溜まりがち。自分のための時間を作ることが難しく、常に時間に追われている状態かもしれません。";
            resultAdvice = "今すぐ心と体をリセットする時間が必要です。朝ヨガで一日の始まりに自分と向き合う習慣をつけることで、少しずつ心身のバランスを取り戻していきましょう。特に「体が硬くてもOK」な朝ヨガは、あなたの体の状態に合わせて無理なく始められます。";
        } else if (countB >= countA && countB >= countC) {
            resultType = "B";
            resultTitle = "あと一歩でスッキリ！バランス重視タイプ";
            resultImage = "Photo/Gemini_Generated_Image_hdtvf0hdtvf0hdtv.png";
            resultDescription = "生活のバランスを取ろうと努力していますが、まだ完全には心身の調和が取れていないようです。時々体の凝りを感じたり、ストレスを感じることもありますが、自分なりの対処法を持っています。";
            resultAdvice = "あと少しの習慣化で、もっと心地よい毎日を手に入れられます。朝ヨガの「カメラオフでOK」な環境は、忙しいあなたにぴったり。自分のペースで続けられる朝の習慣として、心と体のバランスをさらに整えていきましょう。";
        } else {
            resultType = "C";
            resultTitle = "心身良好！さらに輝くウェルネスタイプ";
            resultImage = "Photo/Gemini_Generated_Image_hdtvf1hdtvf1hdtv.png";
            resultDescription = "すでに心身のバランスが取れていて、自分の時間も大切にできているようです。定期的な運動習慣があり、ストレス管理もうまくできています。";
            resultAdvice = "さらに質の高いウェルネスライフを目指しましょう。朝ヨガの「ご機嫌な私へ」のコンセプトは、すでに良好な状態のあなたをさらに輝かせてくれるでしょう。朝の静かな時間に自分と向き合うことで、より深い自己理解と充実感を得られます。";
        }
        
        let html = `
            <div class="quiz-result">
                <h3>あなたは【タイプ${resultType}】</h3>
                <h2>${resultTitle}</h2>
                <div class="result-image">
                    <img src="${resultImage}" alt="タイプ${resultType}の診断結果イメージ">
                </div>
                <p>${resultDescription}</p>
                <div class="result-advice">
                    <h4>やまこヨガからのアドバイス</h4>
                    <p>${resultAdvice}</p>
                </div>
                <div class="cta-buttons">
                    <a href="https://lin.ee/bgnbQ4C" class="btn" target="_blank">無料体験を問い合わせる（LINE）</a>
                    <a href="https://www.kaihipay.jp/forms?form_code=5805285990345474" class="btn" target="_blank">レッスンに申し込む</a>
                </div>
                <button id="retake-quiz" class="btn-secondary">もう一度診断する</button>
            </div>
        `;
        
        quizContainer.innerHTML = html;
        
        document.getElementById('retake-quiz').addEventListener('click', startQuiz);
    }
}
