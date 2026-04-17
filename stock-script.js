document.addEventListener('DOMContentLoaded', () => {
    // 1. 차트 초기화 (Mock Data)
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    // 차트 기본 폰트 색상 설정
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = '#334155';

    const chartData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
            label: '주가 (삼성전자)',
            data: [72000, 73500, 71800, 74200, 75000, 74800, 76200],
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#f87171',
            pointRadius: 4
        }, {
            label: '20일 이동평균선',
            data: [71000, 71500, 72000, 72500, 73000, 73500, 74000],
            borderColor: '#38bdf8',
            borderDash: [5, 5],
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 0
        }]
    };

    const mainChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        font: { size: 12, weight: '600' }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    padding: 12,
                    borderColor: '#334155',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { drawBorder: false },
                    ticks: {
                        callback: (value) => value.toLocaleString() + '원'
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // 2. 필터 슬라이더 상호작용
    const perFilter = document.getElementById('per-filter');
    const perValDisplay = document.querySelector('.filter-val');
    
    perFilter.addEventListener('input', (e) => {
        perValDisplay.textContent = `${e.target.value} 이하`;
    });

    // 3. 종목 스캔 시뮬레이션
    const scanBtn = document.getElementById('scan-btn');
    scanBtn.addEventListener('click', () => {
        const originalText = scanBtn.textContent;
        scanBtn.textContent = '⚡ 분석 중...';
        scanBtn.disabled = true;
        scanBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            alert('📊 분석 완료!\n\n설정한 키워드 조건에 맞는 5개의 우량 종목을 발굴했습니다.\n\n추천 종목: 삼성전자, SK하이닉스, 현대차, 기아, LG에너지솔루션');
            scanBtn.textContent = originalText;
            scanBtn.disabled = false;
            scanBtn.style.opacity = '1';
        }, 1500);
    });

    // 4. 실시간 지수 변동 시뮬레이션 (3초마다)
    setInterval(() => {
        const kospi = document.getElementById('kospi-val');
        if (kospi) {
            const current = parseFloat(kospi.textContent.replace(',', ''));
            const change = (Math.random() - 0.5) * 1.5;
            const newVal = (current + change).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            kospi.textContent = newVal;
            
            // 시각적 효과
            kospi.style.transition = 'color 0.3s';
            kospi.style.color = change > 0 ? '#f87171' : '#60a5fa';
            setTimeout(() => { kospi.style.color = '#f1f5f9'; }, 1000);
        }
    }, 3000);

    // 5. 탭 전환 효과 (UI 전용)
    const tabButtons = document.querySelectorAll('.chart-tabs button');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
