function popup() {
    let width = 600, height = 380;
    let left = 100, top = 100;
    let speed = 20; // Speed variable
    let dx = speed, dy = speed; // Use speed for both x and y direction
    let screenW = window.screen.width, screenH = window.screen.height;
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${width},height=${height},left=${left},top=${top}`;
    let popupWindow = open('rr.html', 'test', params);

    // play video
    document.getElementById('rr').play();

    let move = () => {
        // Update position
        left += dx;
        top += dy;

        // Check for screen boundaries and reverse direction if necessary
        if (left <= 0 || left + width >= screenW) dx = -dx;
        if (top <= 0 || top + height >= screenH) dy = -dy;

        // Move the popup window
        popupWindow.moveTo(left, top);
    };

    // Update the position every 10 milliseconds
    setInterval(move, 10);

    // Check every 500 milliseconds if the popup window has been closed
    let checkClosed = setInterval(() => {
        if (popupWindow.closed) {
            document.getElementById('rr').style.display = 'block';
            // add eventlistener to body to create new popup
            document.body.addEventListener('click', popup);
            // add all posible event listeners to body to create new popup
            document.body.addEventListener('keydown', popup);
            document.body.addEventListener('contextmenu', popup);
            document.body.addEventListener('wheel', popup);
            document.body.addEventListener('touchstart', popup);
            document.body.addEventListener('resize', popup);
            document.body.addEventListener('scroll', popup);
            document.body.style.backgroundColor = 'black';
            clearInterval(checkClosed); // Stop checking once the window is closed
            popup(); // Spawn the popup again
        }
    }, 500);
}


function start() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // create a video element
        let video = document.createElement('video');
        video.src = 'assets/main.mp4';
        video.id = 'main_assets';
        document.body.appendChild(video);
        video.play();

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { /* Safari */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE11 */
            video.msRequestFullscreen();
        }

        // add eventlistener to body to fullscreen video again
        document.body.addEventListener('keydown', start);
        document.body.addEventListener('contextmenu', start);
        document.body.addEventListener('wheel', start);
        document.body.addEventListener('touchstart', start);
        document.body.addEventListener('resize', start);
        document.body.addEventListener('scroll', start);

        return;
    }

    window.onbeforeunload = function() {
        return "";
    }
    popup();
    start_cursor();
}

let cursor = {x: 0, y: 0};
    document.onmousemove = function(e) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    };

function start_cursor() {
    let isMac = navigator.platform.indexOf('Mac') > -1;
    let isLinux = navigator.platform.indexOf('Linux') > -1;
    
    if (isMac) {
        // create 1000 cursors at random positions
        for (let i = 0; i < 300; i++) {
            create_cursor(Math.random() * 3000 - 1500, Math.random() * 3000 - 1500, 'assets/mac-cursor.png');
        }
    } else if (isLinux) {
        // create 1000 cursors at random positions
        for (let i = 0; i < 300; i++) {
            create_cursor(Math.random() * 3000 - 1500, Math.random() * 3000 - 1500, 'assets/linux-cursor.png');
        }
    } else {
        // create 1000 cursors at random positions
        for (let i = 0; i < 300; i++) {
            create_cursor(Math.random() * 3000 - 1500, Math.random() * 3000 - 1500, 'assets/win-cursor.png');
        }
    }
    
    // Makes the cursor invisible
    var lockStyle = document.createElement("style");
    document.head.appendChild(lockStyle);
    lockStyle.sheet.insertRule("html {cursor: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7), auto}")
}

let cursors = [];

function create_cursor(offset_x, offset_y, img) {
    // Create a new cursor element
    let newCursor = document.createElement('img');
    newCursor.src = img;
    newCursor.style.position = 'absolute';
    newCursor.style.width = '32px';
    newCursor.style.height = '32px';
    document.body.appendChild(newCursor);

    // Store the cursor with its offset
    cursors.push({ element: newCursor, offsetX: offset_x, offsetY: offset_y });

    // Attach a unique onmousemove event listener for this cursor
    document.addEventListener('mousemove', function(e) {
        newCursor.style.left = e.pageX + offset_x + 'px';
        newCursor.style.top = e.pageY + offset_y + 'px';
    });
}