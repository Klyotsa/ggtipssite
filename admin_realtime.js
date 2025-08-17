// admin_realtime.js - Автоматическое обновление данных в реальном времени
class AdminRealtimeUpdater {
    constructor() {
        this.updateInterval = 5000; // Обновление каждые 5 секунд
        this.isActive = false;
        this.currentPage = window.location.pathname.split('/').pop() || 'admin_panel.php';
        this.lastUpdate = {};
        this.init();
    }

    init() {
        // Запускаем обновление только если страница админки
        if (this.isAdminPage()) {
            this.startAutoUpdate();
            this.addUpdateIndicators();
            this.addManualRefreshButtons();
        }
    }

    isAdminPage() {
        const adminPages = [
            'admin_panel.php',
            'admin_users.php',
            'admin_transactions.php',
            'admin_activity.php'
        ];
        return adminPages.includes(this.currentPage);
    }

    startAutoUpdate() {
        this.isActive = true;
        this.updateData();
        
        // Запускаем интервал обновления
        setInterval(() => {
            if (this.isActive) {
                this.updateData();
            }
        }, this.updateInterval);

        // Обновляем при возвращении на вкладку
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isActive) {
                this.updateData();
            }
        });

        // Обновляем при фокусе на окне
        window.addEventListener('focus', () => {
            if (this.isActive) {
                this.updateData();
            }
        });
    }

    async updateData() {
        try {
            const response = await fetch(`/admin_realtime_data.php?page=${this.currentPage}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.processUpdate(data);
            }
        } catch (error) {
            console.log('Realtime update error:', error);
            // Не показываем ошибки пользователю, чтобы не мешать работе
        }
    }

    processUpdate(data) {
        const page = this.currentPage;
        
        switch (page) {
            case 'admin_panel.php':
                this.updateDashboard(data);
                break;
            case 'admin_users.php':
                this.updateUsersList(data);
                break;
            case 'admin_transactions.php':
                this.updateTransactionsList(data);
                break;
            case 'admin_activity.php':
                this.updateActivityList(data);
                break;
        }

        // Обновляем индикатор последнего обновления
        this.updateLastUpdateIndicator();
    }

    updateDashboard(data) {
        if (data.stats) {
            // Обновляем статистику
            Object.keys(data.stats).forEach(key => {
                const element = document.querySelector(`[data-stat="${key}"]`);
                if (element) {
                    const newValue = data.stats[key];
                    const oldValue = element.textContent;
                    
                    if (oldValue !== newValue.toString()) {
                        // Анимация изменения
                        element.style.transform = 'scale(1.1)';
                        element.style.color = '#ffd700';
                        element.textContent = newValue;
                        
                        setTimeout(() => {
                            element.style.transform = 'scale(1)';
                            element.style.color = '';
                        }, 500);
                    }
                }
            });
        }
    }

    updateUsersList(data) {
        if (data.users && data.users.length > 0) {
            const tbody = document.querySelector('.users-table tbody');
            if (tbody) {
                // Обновляем существующие строки
                data.users.forEach(user => {
                    const row = document.querySelector(`[data-user-id="${user.id}"]`);
                    if (row) {
                        // Обновляем данные пользователя
                        this.updateUserRow(row, user);
                    }
                });
            }
        }
    }

    updateTransactionsList(data) {
        if (data.transactions && data.transactions.length > 0) {
            const tbody = document.querySelector('.transactions-table tbody');
            if (tbody) {
                // Обновляем существующие строки
                data.transactions.forEach(transaction => {
                    const row = document.querySelector(`[data-transaction-id="${transaction.id}"]`);
                    if (row) {
                        // Обновляем данные транзакции
                        this.updateTransactionRow(row, transaction);
                    }
                });
            }
        }
    }

    updateActivityList(data) {
        if (data.activities && data.activities.length > 0) {
            const container = document.querySelector('.activity-table');
            if (container) {
                // Обновляем существующие записи активности
                data.activities.forEach(activity => {
                    const row = document.querySelector(`[data-activity-id="${activity.id}"]`);
                    if (row) {
                        // Обновляем данные активности
                        this.updateActivityRow(row, activity);
                    }
                });
            }
        }
    }

    updateUserRow(row, user) {
        // Обновляем данные пользователя
        const usernameCell = row.querySelector('.username');
        const emailCell = row.querySelector('.email');
        const balanceCell = row.querySelector('.balance');
        const statusCell = row.querySelector('.status');

        if (usernameCell && usernameCell.textContent !== user.username) {
            usernameCell.textContent = user.username;
            this.highlightChange(usernameCell);
        }

        if (emailCell && emailCell.textContent !== user.email) {
            emailCell.textContent = user.email;
            this.highlightChange(emailCell);
        }

        if (balanceCell && balanceCell.textContent !== user.balance) {
            balanceCell.textContent = user.balance;
            this.highlightChange(balanceCell);
        }
    }

    updateTransactionRow(row, transaction) {
        // Обновляем данные транзакции
        const amountCell = row.querySelector('.amount');
        const statusCell = row.querySelector('.status');
        const descriptionCell = row.querySelector('.description');

        if (amountCell && amountCell.textContent !== transaction.amount) {
            amountCell.textContent = transaction.amount;
            this.highlightChange(amountCell);
        }

        if (statusCell && statusCell.textContent !== transaction.status) {
            statusCell.textContent = transaction.status;
            this.highlightChange(statusCell);
        }
    }

    updateActivityRow(row, activity) {
        // Обновляем данные активности
        const descriptionCell = row.querySelector('.description');
        const timestampCell = row.querySelector('.timestamp');

        if (descriptionCell && descriptionCell.textContent !== activity.description) {
            descriptionCell.textContent = activity.description;
            this.highlightChange(descriptionCell);
        }

        if (timestampCell && timestampCell.textContent !== activity.created_at) {
            timestampCell.textContent = activity.created_at;
            this.highlightChange(timestampCell);
        }
    }

    highlightChange(element) {
        // Подсвечиваем измененный элемент
        element.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
        element.style.border = '1px solid #ffd700';
        
        setTimeout(() => {
            element.style.backgroundColor = '';
            element.style.border = '';
        }, 2000);
    }

    addUpdateIndicators() {
        // Добавляем индикатор статуса обновления
        const header = document.querySelector('.header');
        if (header) {
            const statusIndicator = document.createElement('div');
            statusIndicator.className = 'realtime-status';
            statusIndicator.innerHTML = `
                <div class="status-dot"></div>
                <span class="status-text">Автообновление активно</span>
                <span class="last-update">Последнее обновление: ${this.formatTime(new Date())}</span>
            `;
            header.appendChild(statusIndicator);
        }

        // Добавляем стили для индикатора
        this.addStatusStyles();
    }

    addManualRefreshButtons() {
        // Добавляем кнопку ручного обновления
        const header = document.querySelector('.header');
        if (header) {
            const refreshBtn = document.createElement('button');
            refreshBtn.className = 'manual-refresh-btn';
            refreshBtn.innerHTML = '🔄 Обновить сейчас';
            refreshBtn.onclick = () => this.manualRefresh();
            header.appendChild(refreshBtn);
        }
    }

    async manualRefresh() {
        const btn = document.querySelector('.manual-refresh-btn');
        if (btn) {
            btn.innerHTML = '⏳ Обновление...';
            btn.disabled = true;
        }

        await this.updateData();

        if (btn) {
            btn.innerHTML = '🔄 Обновить сейчас';
            btn.disabled = false;
        }
    }

    updateLastUpdateIndicator() {
        const lastUpdateElement = document.querySelector('.last-update');
        if (lastUpdateElement) {
            lastUpdateElement.textContent = `Последнее обновление: ${this.formatTime(new Date())}`;
        }
    }

    formatTime(date) {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    addStatusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .realtime-status {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-left: auto;
                font-size: 0.9em;
                color: #ccc;
            }

            .status-dot {
                width: 8px;
                height: 8px;
                background: #4CAF50;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }

            .manual-refresh-btn {
                padding: 8px 16px;
                background: linear-gradient(45deg, #4CAF50, #45a049);
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.9em;
                margin-left: 15px;
                transition: all 0.3s ease;
            }

            .manual-refresh-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }

            .manual-refresh-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .last-update {
                font-size: 0.8em;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }

    stopAutoUpdate() {
        this.isActive = false;
    }

    startAutoUpdate() {
        this.isActive = true;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.adminUpdater = new AdminRealtimeUpdater();
});

// Экспорт для использования в других скриптах
window.AdminRealtimeUpdater = AdminRealtimeUpdater;
