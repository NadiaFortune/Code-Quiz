//The games needs to keep score
//The game needs a timer that counts down from 90 seconds to 0
//The timer needs to decrement by 10 seconds if a wrong answer is chosen by the user
// highScore.js 

var scoresBtn = document.querySelector( 
	"#view-high-scores"
); 

// Rank previous scores in order by 
// Retrieving scores from localStorage 

function printHighscores() { 
	var highscores = 
		JSON.parse( 
			window.localStorage.getItem( 
				"#highscores"
			) 
		) || []; 
	highscores.sort(function (a, b) { 
		return b.score - a.score; 
	}); 
	highscores.forEach(function ( 
		score 
	) { 
		var liTag = 
			document.createElement( 
				"li"
			); 
		liTag.textContent = 
			score.name + 
			" - " + 
			score.score; 
		var olEl = 
			document.getElementById( 
				"#highscores"
			); 
		olEl.appendChild(liTag); 
	}); 
} 

// Clear previous scores when users click clear 
function clearHighscores() { 
	window.localStorage.removeItem( 
		"#highscores"
	); 
	window.location.reload(); 
} 
document.getElementById( 
	"clear"
).onclick = clearHighscores; 

printHighscores();
