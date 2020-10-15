# Общее

Приложение носит развлекательный характер и пишется исключительно для тренировки личных навыков программирования.
Суть приложения проста - контролировать популяцию кроликов на поле 20х20 клеток.

На даанном этапе разработки реализовано:
- Игровое поле (`<Playground />`)
- Панель управления (`<Panel />`) - не до конца.
- Кролики (`<Rabbit />`)

Вся логика приложения хранится в stores( MobX ), так что компоненты реакта, по сути...тупые. 

### mainStore
Здесь все самое интересное. Данный стор является корневым и прослушивает остальные, отвечает за реализацию перемещения животных по карте(включая задержку), контролирует их популяцию(20% и в зависимости от тайла. животные(сейчас кролики) не могут размножаться на некоторых типах тайлов), контролирует память животных.

### forestStore 
ForestStore отвечает за состояние игрового поля. Инициализируется при запуске приложения, генерируя игровую площадку.
Поле имеет в себе несколько разновидностей тайлов(детали в staticData/data.ts), такие как:
- Вода(water)
- Болото(swamp)
- Грязь(mud)
- Лес(forest)
- Нора(hole)
- Трава(grass)

Генерация игрового поля происходит псевдо-случайным образом. Каждый их тайлов имеет процентный диапозон. Выбор процента происходит псевдо-случайно, как и их расположение на игровом поле. 

В зависимости от тайла животное(пока только кролики), получают задержку в движении. Например если кролик оказался в воде - он ожидает 3 игровых хода, в лесу - 2.
Если же кролик(тут уже строго) попадает в нору, то псевдо-случайным образом он может оказаться на любом другом тайле норы.

### rabbitStore
RabbitStore отвечает за состояние кроликов. (в дальнейшем планируется адаптировать под второй тип животных, сделав стор более универсальным). Данный стор инициализирует кроликов при старте игры(их расположение на карте так же псевдо-случайно, но не половины карты(на перспективу с другим типом животных)).

У кроликов есть простенькая память и скудный интеллект, которая хранит в себе до 10 тайлов с задержками. Животное, оказавшись на замедляющем тайле, с вероятностью в 15% может его запомнить. С этого момента каждый следующий шаг животное будет обращаться к своей памяти, проверяя, было ли оно на предстоящем тайле и, если такой окажется в его памяти, то, с вероятностью в 20% он развернется в любую другую сторону.(animalMemory)

### tableStore
Данный стор отвечает за состояние игровой панели. Тут нет ничего интересного на данный момент и реализация формальна. Сейчас он просто отвечает за отражение игрового процесса: количество прошедших ходов, количество кроликов и игровая скорость(её можно менять, увеличивая или уменьшая временной интервал).


### Почему ambient declaration в объявлении типов?
1. Чтобы не создавать ад импортов.
2. Я искал ответы, но нигде не увидел, что это плохая практика.
3. ...но и подтверждения хороших практик я тоже не нашел.

### Бардак на Git
На данном этапе я использую гит не столько ради версионирования, сколько как дневник проведенных работ, дабы показать(если кто-то его вообще открывает), что я что-то делаю и практикуюсь.