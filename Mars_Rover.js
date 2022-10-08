function Mars_Rover(x, y, direction, Command, obstacles) {
    this.x = (x == undefined) ? x = 0 : x;
    this.y = (y == undefined) ? y = 0 : y;
    this.direction = (direction == undefined) ? 'N' : direction;
    this.obstacles = (obstacles == undefined) ? [] : obstacles;
    var arr_stat = [];
    var stopped = '';//obstacles
    console.log('Input:[' + this.x, ",", this.y, ",", this.direction + ']');
    // get all info about Diretion and (x,y) axis
    Get_command(Command);

    //F && B ==> affect on X & Y
    //L && R ==>affec on Direction
    // Point 1
    function Get_command(Command) {
        if (Command != undefined) {
            for (var i = 0; i < Command.length; i++) {
                var single_command = Command[i];
                if (single_command == 'F' || single_command == 'B') {
                    var x_y = Move_Direction(single_command);
                    // case find any obstacles
                    if (x_y == false) {
                        break;
                    }
                } else if (single_command == 'L' || single_command == 'R') {
                    var dic = Turn_Direction(single_command);
                }
                arr_stat.push([this.x + " , " + this.y + " , " + this.direction]);
            }
            if (stopped === 'STOPPED') {
                console.log('Output:STOPPED in Position:[' + arr_stat[arr_stat.length - 1] + ']');
            } else {
                console.log('Output:[' + arr_stat[arr_stat.length - 1] + ']');
            }
        }
    }

    //Moveing
    function Move_Direction(single_command) {
        var inc_x = 0, inc_y = 0;
        if (this.direction == 'N') { inc_y = 1; }
        else if (this.direction == 'E') { inc_x = 1; }
        else if (this.direction == 'W') { inc_x = -1; }
        else if (this.direction == 'S') { inc_y = -1; }
        if (single_command == 'B') {
            inc_x *= -1;
            inc_y *= -1;
        }
        var new_x_direction = this.x + inc_x;
        var new_y_direction = this.y + inc_y;
        this.x = new_x_direction;
        this.y = new_y_direction;
        var res = [self.x, self.y];
        // console.log(arr_stat);
        // case this point is an obstcle
        if (show_obstacles(res)) {
            stopped = 'STOPPED';
            return false;
        }
        return true;
    }

    //Left or right function to change Direction of object
    function Turn_Direction(single_command) {
        var D = Get_Direction(self.direction);
        var result = (single_command == 'L') ? D = (D + 4 - 1) % 4 : D = (D + 1) % 4;
        this.direction = this.directions[result];
        return this.direction;
    }

    // change Direction -90 or 90
    function Get_Direction(D) {
        this.directions = ['N', 'E', 'S', 'W'];
        for (var index = 0; index < 4; index++) {
            if (this.directions[index] == D) {
                return index;
            }
        }
    };

    // Point 2
    function show_obstacles(loction_obstacles) {
        for (var i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].toString() == loction_obstacles.toString()) {
                return true
            }
        }
    }
}
// Test Case 
console.log("Case 1:");
Mars_Rover(undefined, undefined, 'N', 'BFLFFR', [[1, 4], [3, 5], [7, 4]]); //==>Result: -2 0 N
console.log("---------------------------------");
console.log("Case 2:");
Mars_Rover(undefined, undefined, 'E', 'FLFFFRFLB', [[1, 4], [3, 5], [7, 4]]); //==>Result: 2 2 N
console.log("---------------------------------");
console.log("Case 3:");
Mars_Rover(1, 2, 'N', 'LFLFLFLFF', [[1, 1], [3, 5], [7, 4]]); //==>Result with obtcales:0 1 E
console.log("---------------------------------");
console.log("Case 4:");
Mars_Rover(1, 2, 'N', 'LFLFLFLFF'); //==>Result without obstcale:1 3 N
console.log("---------------------------------");
console.log("Case 5:");
Mars_Rover(3, 3, 'E', 'FFRFFRFRRF', [[4, 1], [3, 5], [7, 4]]); //==>Result without obstcale:5 1 E
console.log("---------------------------------");
console.log("Case 6:");
Mars_Rover(3, 3, undefined, 'FFRRL', [[4, 1], [3, 5], [7, 4]]); //==>Result with obstcale:[3 , 4 , N]
console.log("---------------------------------");
console.log("Case 7:");
Mars_Rover(1, undefined, 'N', 'FFBLBR', [[4, 1], [3, 5], [7, 4]]); //==>Result with obstcale:[2 , 1 , N]onsole.log("---------------------------------");
console.log("---------------------------------");
console.log("Case 8:");
Mars_Rover(undefined, 5, 'S', 'FFBLBR', [[4, 1], [3, 5], [7, 4]]); //==>Result with obstcale:[-1 , 4 , S]
