var c = 0;

scene("a", function(){
	p("Первая база. Счет: "+c);
	b("Вперед", ".b")
});

scene("a");

scene("b", function(){
	p("Привет мир! Это вторая база");
	b("Назад", ".a c=1000")
})