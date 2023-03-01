window.onload = () => {
    const app = document.getElementById('app');
    const coors = [2, 5, 1, 3, 1, 2, 1, 7, 7, 6];

    const highest = coors.map(v => v).sort().reverse()[0];

    for (const el of coors) {
        let col = createColumn();

        for (let i = 0; i < el; i++) {
            const cube = createCube();
            cube.innerHTML = i + 1;

            col.appendChild(cube);
        }

        for (let j = 0; j < highest - el; j++) {
            const cube = createWater();
            cube.innerHTML = j + 1;
            col.appendChild(cube);
        }

        app.appendChild(col);
    }

    var colums =  Array.from(app.getElementsByClassName('column'));

    var copy = Object.assign({}, colums);

    for (let index = 0; index < colums.length; index++) {

        if (colums[index - 1]) {
            const groundLeft = colums[index - 1].getElementsByClassName('cube').length;
            const groundCenter = colums[index].getElementsByClassName('cube').length;

            if ((groundLeft > groundCenter)) {
                Array
                    .from(colums[index].getElementsByClassName('water'))
                    .forEach(v => colums[index].removeChild(v));
            }
            if ((groundLeft < groundCenter)) {
                Array
                    .from(colums[index - 1].getElementsByClassName('water'))
                    .forEach(v => colums[index - 1].removeChild(v));

            }
        }

    }


    let picks =  colums.map((v, i, a) => {
        const ind = Array.from(v.children).findIndex(z => z.classList.contains('water'));
        if ( ind> -1) {
            return {
                index: i,
                height: v.getElementsByClassName('cube').length
            };
        }
    });


    const picksAll = picks.filter(v => v).map((v, i, array) => {
        return {
            first: array[i],
            next: array[i + 1]
        }
    }).filter(v => v.first && v.next);


    for (const pick of picksAll) {
        const height = pick.first.height > pick.next.height ? pick.next.height : pick.first.height; 

        const start = pick.first.index + 1;
        for (let i = start; i < pick.next.index; i++) {
            const need = height - copy[i].children.length;


            for (let j = 0; j < need; j++) {
                copy[i].appendChild(createWater());
            }
        }


        Array.from(copy[pick.first.index].children).forEach((v, i, a) => {
            if (v.classList.contains('water')) {
                copy[pick.first.index].removeChild(v);
            }
        });

        Array.from(copy[pick.next.index].children).forEach((v, i, a) => {
            if (v.classList.contains('water')) {
                copy[pick.next.index].removeChild(v);
            }
        });
    }








}

function createColumn() {
    const column  = document.createElement('div');
    column.className = 'column';
    return column;
}

function createCube() {
    const column  = document.createElement('div');
    column.className = 'cube';
    return column;
}

function createWater() {
    const column  = document.createElement('div');
    column.className = 'water';
    return column;
}