document.addEventListener('DOMContentLoaded', function() {
    // 診断アプリの初期化
    initQuizApp();
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQのアコーディオン機能を初期化
    initFaq();
});

// 診断アプリの初期化
function initQuizApp() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    const startButton = document.getElementById('start-quiz');
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }
}

// 診断開始
function startQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const questions = [
        {
            question: "朝の目覚めについて",
            answers: [
                "朝スッキリ起きられないことがよくある",
                "目覚めは悪くないが、日中だるさを感じることがある",
                "毎日気持ちよく起きられている"
            ]
        },
        {
            question: "体の凝りや不調について",
            answers: [
                "肩や首がガチガチで、いつも重く感じる",
                "特定の箇所が時々凝るが、ストレッチで和らぐ",
                "特に体の凝りは感じない"
            ]
        },
        {
            question: "心の状態、ストレスについて",
            answers: [
                "仕事や人間関係でストレスを感じやすく、イライラすることが多い",
                "ストレスはあるが、気分転換で解消できている",
                "比較的穏やかに過ごせている"
            ]
        },
        {
            question: "運動習慣について",
            answers: [
                "ほとんど運動する機会がなく、運動不足を感じている",
                "たまに体を動かすが、継続はできていない",
                "定期的に運動している"
            ]
        },
        {
            question: "自分の時間について",
            answers: [
                "自分のための時間がほとんど取れず、いつも時間に追われている",
                "たまには自分の時間を作れている",
                "十分に自分の時間を楽しめている"
            ]
        }
    ];
    
    let currentQuestion = 0;
    let answers = [];
    
    // 診断スタート画面を非表示
    document.getElementById('quiz-start').style.display = 'none';
    
    // 質問を表示
    showQuestion();
    
    function showQuestion() {
        const questionData = questions[currentQuestion];
        
        let questionHTML = `
            <div class="quiz-question">
                <h3>${questionData.question}</h3>
                <div class="answers">
        `;
        
        questionData.answers.forEach((answer, index) => {
            questionHTML += `
                <div class="answer-option">
                    <input type="radio" name="q${currentQuestion}" id="q${currentQuestion}a${index}" value="${index}">
                    <label for="q${currentQuestion}a${index}">${answer}</label>
                </div>
            `;
        });
        
        questionHTML += `
                </div>
                <button id="next-question" class="quiz-button">次へ</button>
            </div>
        `;
        
        quizContainer.innerHTML = questionHTML;
        
        document.getElementById('next-question').addEventListener('click', function() {
            const selectedAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
            
            if (selectedAnswer) {
                answers.push(parseInt(selectedAnswer.value));
                currentQuestion++;
                
                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            } else {
                alert('選択肢を選んでください');
            }
        });
    }
    
    function showResult() {
        // 回答を集計
        const aCount = answers.filter(a => a === 0).length;
        const bCount = answers.filter(a => a === 1).length;
        const cCount = answers.filter(a => a === 2).length;
        
        let resultType;
        let resultTitle;
        let resultDescription;
        let resultImage;
        let yogaRecommendation;
        
        if (aCount >= 3) {
            resultType = "タイプA";
            resultTitle = "心身SOS！溜め込みがちな休息必須タイプ";
            resultDescription = "毎日の忙しさで心も体も悲鳴をあげているようです。肩や首の凝りがひどく、ストレスも溜まりがち。自分のための時間を作ることが難しく、常に時間に追われている状態かもしれません。";
            resultImage = "images/type-a.png";
            yogaRecommendation = "やまこヨガでは、特に「体が硬くてもOK」な優しいポーズと、「イライラ解消」に効果的な呼吸法を中心に行います。カメラオフでリラックスしながら参加できるので、自分だけの安心空間で心と体をリセットできますよ。";
        } else if (bCount >= 3) {
            resultType = "タイプB";
            resultTitle = "あと一歩でスッキリ！バランス重視タイプ";
            resultDescription = "日々の生活の中で、ある程度は自分の時間を作れていますが、完全にリラックスできているわけではないようです。時々体の凝りを感じたり、ストレスを抱えることもあるかもしれません。";
            resultImage = "images/type-b.png";
            yogaRecommendation = "やまこヨガでは、「ご機嫌な私へ」導くポーズと呼吸法で、あなたの日常にさらなる余裕と活力をプラスします。継続的な習慣づくりをサポートし、より良いバランスを見つける手助けをします。";
        } else {
            resultType = "タイプC";
            resultTitle = "心身良好！さらに輝くウェルネスタイプ";
            resultDescription = "心身ともにバランスが取れている状態です。日々の生活の中で自分の時間を確保し、ストレスも上手に管理できているようです。これからも良い状態を維持したいですね。";
            resultImage = "images/type-c.png";
            yogaRecommendation = "やまこヨガでは、あなたの良好な状態をさらに向上させるポーズと呼吸法で、より深いリラクゼーションと自己成長をサポートします。すでに良い習慣をお持ちの方も、新たな気づきと発見があるはずです。";
        }
        
        let resultHTML = `
            <div class="quiz-result">
                <h3 class="result-title">${resultTitle}</h3>
                <div class="result-image">
                    <img src="${resultImage}" alt="${resultType}">
                </div>
                <p class="result-description">${resultDescription}</p>
                <div class="yoga-recommendation">
                    <h4>あなたにおすすめのヨガアプローチ</h4>
                    <p>${yogaRecommendation}</p>
                </div>
                <div class="result-actions">
                    <a href="#contact" class="primary-button">無料体験に申し込む</a>
                    <a href="https://lin.ee/yourLineID" target="_blank" class="secondary-button">LINE@で質問する</a>
                </div>
            </div>
        `;
        
        quizContainer.innerHTML = resultHTML;
        
        // 「もう一度診断する」ボタンを追加
        const retakeButton = document.createElement('button');
        retakeButton.id = 'retake-quiz';
        retakeButton.className = 'quiz-button outline';
        retakeButton.textContent = 'もう一度診断する';
        quizContainer.querySelector('.quiz-result').appendChild(retakeButton);
        
        // もう一度診断するボタンのイベントリスナー
        document.getElementById('retake-quiz').addEventListener('click', function() {
            // 変数をリセット
            currentQuestion = 0;
            answers = [];
            
            // 診断結果を非表示にして、診断スタート画面を表示
            quizContainer.innerHTML = '';
            
            // 診断スタート画面を再表示
            const quizStartHTML = `
                <div id="quiz-start" class="quiz-start">
                    <div class="quiz-start-image">
                        <img src="images/quiz-icon.svg" alt="診断スタート">
                    </div>
                    <h3>あなたの心と体の状態をチェック</h3>
                    <p>忙しい毎日の中で、あなたの心と体はどんな状態ですか？<br>簡単な質問に答えて、あなたにぴったりの朝ヨガの取り入れ方を見つけましょう。</p>
                    <button id="start-quiz" class="quiz-button">診断スタート</button>
                </div>
            `;
            
            quizContainer.innerHTML = quizStartHTML;
            
            // 診断スタートボタンにイベントリスナーを再設定
            document.getElementById('start-quiz').addEventListener('click', startQuiz);
        });
    }
}

// FAQのアコーディオン機能
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    // 初期状態では回答を非表示に
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.display = 'none';
    });
    
    // クリックイベントを追加
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                // 現在の表示状態を取得
                const isOpen = answer.style.display === 'block';
                
                // 他のすべての回答を閉じる
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.display = 'none';
                });
                
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                // クリックされた質問の回答を切り替え
                if (!isOpen) {
                    answer.style.display = 'block';
                    question.classList.add('active');
                }
            });
        }
    });
}
