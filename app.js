 // Snake Game Implementation
        const canvas = document.getElementById('snakeGame');
        const ctx = canvas.getContext('2d');
        const gridSize = 15;
        const tileCount = canvas.width / gridSize;

        let snake = [{x: 10, y: 10}];
        let food = {x: 5, y: 5};
        let dx = 0;
        let dy = 0;
        let score = 0;
        let gameLoop;
        let gameStarted = false;
        let foodEaten = 0;
        const maxFood = 10;

        // Colors
        const bgColor = '#011627';
        const snakeColor = '#43D9AD';
        const foodColor = '#43D9AD';
        const gridColor = '#1E2D3D';

        function drawGame() {
            // Clear canvas
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= tileCount; i++) {
                ctx.beginPath();
                ctx.moveTo(i * gridSize, 0);
                ctx.lineTo(i * gridSize, canvas.height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * gridSize);
                ctx.lineTo(canvas.width, i * gridSize);
                ctx.stroke();
            }

            // Move snake
            if (gameStarted) {
                const head = {x: snake[0].x + dx, y: snake[0].y + dy};
                
                // Check wall collision
                if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                    gameOver();
                    return;
                }

                // Check self collision
                for (let segment of snake) {
                    if (head.x === segment.x && head.y === segment.y) {
                        gameOver();
                        return;
                    }
                }

                snake.unshift(head);

                // Check food collision
                if (head.x === food.x && head.y === food.y) {
                    score++;
                    foodEaten++;
                    updateFoodCounter();
                    if (foodEaten >= maxFood) {
                        winGame();
                        return;
                    }
                    generateFood();
                } else {
                    snake.pop();
                }
            }

            // Draw snake
            ctx.fillStyle = snakeColor;
            snake.forEach(segment => {
                ctx.fillRect(
                    segment.x * gridSize + 2,
                    segment.y * gridSize + 2,
                    gridSize - 4,
                    gridSize - 4
                );
            });

            // Draw food
            ctx.fillStyle = foodColor;
            ctx.beginPath();
            ctx.arc(
                food.x * gridSize + gridSize / 2,
                food.y * gridSize + gridSize / 2,
                gridSize / 3,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        function generateFood() {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
            // Make sure food doesn't spawn on snake
            for (let segment of snake) {
                if (food.x === segment.x && food.y === segment.y) {
                    generateFood();
                    return;
                }
            }
        }

        function updateFoodCounter() {
            const dots = document.querySelectorAll('.food-dot');
            dots.forEach((dot, index) => {
                if (index < foodEaten) {
                    dot.style.opacity = '0.3';
                }
            });
        }

        function gameOver() {
            clearInterval(gameLoop);
            gameStarted = false;
            document.getElementById('messageText').textContent = 'GAME OVER!';
            document.getElementById('restartBtn').textContent = 'start-again';
            document.getElementById('gameMessage').classList.remove('hidden');
        }

        function winGame() {
            clearInterval(gameLoop);
            gameStarted = false;
            document.getElementById('messageText').textContent = 'WELL DONE!';
            document.getElementById('restartBtn').textContent = 'play-again';
            document.getElementById('gameMessage').classList.remove('hidden');
        }

        function startGame() {
            snake = [{x: 10, y: 10}];
            dx = 0;
            dy = 0;
            score = 0;
            foodEaten = 0;
            gameStarted = true;
            document.getElementById('gameMessage').classList.add('hidden');
            document.getElementById('startBtn').style.display = 'none';
            generateFood();
            updateFoodCounter();
            
            if (gameLoop) clearInterval(gameLoop);
            gameLoop = setInterval(drawGame, 100);
        }

        function changeDirection(newDx, newDy) {
            // Prevent reversing
            if ((dx === 1 && newDx === -1) || (dx === -1 && newDx === 1)) return;
            if ((dy === 1 && newDy === -1) || (dy === -1 && newDy === 1)) return;
            
            dx = newDx;
            dy = newDy;
        }

        // Event Listeners
        document.getElementById('startBtn').addEventListener('click', startGame);
        document.getElementById('restartBtn').addEventListener('click', startGame);
        document.getElementById('skipBtn').addEventListener('click', () => {
            window.location.href = 'about.html';
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!gameStarted && e.key.startsWith('Arrow')) {
                startGame();
            }
            
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    changeDirection(0, -1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    changeDirection(0, 1);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    changeDirection(-1, 0);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    changeDirection(1, 0);
                    break;
            }
        });

        // Button controls
        document.querySelectorAll('.arrow-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!gameStarted) startGame();
                
                const direction = btn.dataset.direction;
                switch(direction) {
                    case 'up': changeDirection(0, -1); break;
                    case 'down': changeDirection(0, 1); break;
                    case 'left': changeDirection(-1, 0); break;
                    case 'right': changeDirection(1, 0); break;
                }
            });
        });

        // Initial draw
        drawGame();

         // Live preview update
        document.getElementById('nameInput').addEventListener('input', (e) => {
            document.getElementById('previewName').textContent = `"${e.target.value}"`;
        });

        document.getElementById('emailInput').addEventListener('input', (e) => {
            document.getElementById('previewEmail').textContent = `"${e.target.value}"`;
        });

        document.getElementById('messageInput').addEventListener('input', (e) => {
            document.getElementById('previewMessage').textContent = `"${e.target.value}"`;
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        });

        function resetForm() {
            document.getElementById('contactForm').reset();
            document.getElementById('contactForm').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('previewName').textContent = '""';
            document.getElementById('previewEmail').textContent = '""';
            document.getElementById('previewMessage').textContent = '""';
        }

        // Set current date
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
        document.getElementById('previewDate').textContent = `"${dateStr}"`;

        // Filter functionality
        const checkboxes = document.querySelectorAll('.filter-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterProjects);
        });

        function filterProjects() {
            // Add your filter logic here
            console.log('Filtering projects...');
        }

        function showSection(section) {
            console.log('Showing section:', section);
            // Add your section switching logic here
        }