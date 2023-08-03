const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $(".name_of_the_song");
const thumb = $(".thumb");
const audio = $("#audio");
const author = $(".singer");
const playBtn = $(".btn-play");
const playIcon = playBtn.querySelector(".fa-play");
const pauseIcon = playBtn.querySelector(".fa-pause");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-prev");
const ranBtn = $(".btn-random");
const shuffle = ranBtn.querySelector(".fa-shuffle");
const repeatBtn = $(".btn-repeat");
const repeat = repeatBtn.querySelector(".fa-rotate-right");
const startTimeSpan = $(".time-left");
const endTimeSpan = $(".time-right");
const volumnSlider = $(".volumn-slide");
const volumnInput = volumnSlider.querySelector("input");
const volumnClick = $(".volumn-click");
const volumnIcon = volumnClick.querySelector(".fa-volume-high");
const muteIcon = volumnClick.querySelector(".fa-volume-xmark");
const volumnValue = $("#volumnValue");
const rowSong = $(".row-song");
let lastVolumnValue;
let tempLastVolumnValue = lastVolumnValue;

    const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    songs: [
        {
            name: "Thiếu niên",
            singer: "Mộng Nhiên",
            path: "./src/audio/ThieuNien.mp3",
            image:"./src/image/thieu_nien.jpg",
        },
        {
            name: "Có thể hay không",
            singer: "Trương Tử Hào",
            path: "./src/audio/CoTheDuocKhong.mp3",
            image:"./src/image/co_the_hay_khong.jpg",
        },
        {
            name: "Một triệu khả năng",
            singer: "Christine Welch",
            path: "./src/audio/Mot-trieu-kha-nang.mp3",
            image:"https://i1.sndcdn.com/artworks-000396366138-k8qcrb-t500x500.jpg",
        },
        {
            name: "Người theo đuổi ánh sáng",
            singer: "Từ Vi",
            path: "./src/audio/Nguoi-theo-duoi-anh-sang.mp3",
            image:"https://i1.sndcdn.com/artworks-000248783172-d3kjj1-t500x500.jpg",
        },
        {
            name: "Một Đường Đời Hoa",
            singer: "Ôn Dịch Tâm",
            path: "./src/audio/Mot-Duong-Doi-Hoa.mp3",
            image:"https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/2/f/5/e/2f5ee322dfb7983a0b7b8444cd5f1706.jpg",
        },
        {
            name: "Giày cao gót màu đỏ",
            singer: "Thái Kiện Nhã",
            path: "./src/audio/Giay_cao_got_mau_do.mp3",
            image:"\./src/image/giay_cao_got_mau_do.jpg",
        },
        {
            name: "Gió nổi rồi",
            singer: "Châu Thấm",
            path: "./src/audio/Gio-Noi-Len-Roi.mp3",
            image:"./src/image/Gio_noi_len_roi.jpg",
        },
        {
            name: "Đông miên",
            singer: "Tư Nam",
            path: "./src/audio/Dong-Mien.mp3",
            image:"https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/8/9/7/38971d899d0cc07423626e26dcae595c.jpg",
        },
        {
            name: "Thế giới bao la vẫn gặp được người",
            singer: "",
            path: "./src/audio/TheGioiLonNhuVayVanGapDuocAnh.mp3",
            image:"./src/image/the_gioi_bao_la_van_gap_duoc_nguoi.jpg",
        },
        {
            name: "Vây giữ",
            singer: "Vương Tinh Văn Không Mập",
            path: "./src/audio/Vay-Giu-Vuong-Tinh-Van-Khong-Map.mp3",
            image:"./src/image/vay_giu.jpg",
        },
        {
            name: "Gặp em đúng lúc",
            singer: "Luân Tang",
            path: "./src/audio/Gap-em-dung-luc-Luan-Tang-Luan-Tang.mp3",
            image:"./src/image/gap +_em_dung_luc.jpg",
        },
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
        return `
            <div class="song boder-radius ${
            index === this.currentIndex ? "playing" : ""
            }" data-index="${index}">
                <div class="song-content">
                <div class="image-song">
                <div class="icon-play">
                    <i class="fa-solid fa-circle-play" style="color: #00ff62;"></i>
                </div>
                    <img
                    src="${song.image}"
                    alt=""
                    class="boder-radius"
                    />
                </div>
                <div class="detail-song">
                    <h3 class="name-song title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                </div>
            </div>
            `;
        });
        rowSong.innerHTML = htmls.join("");
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
        get: function () {
            return this.songs[this.currentIndex];
        },
        });
    },

    handleEvent: function () {
        const _this = this;
        // xử lý khi click play
        playBtn.onclick = () => {
        if (_this.isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        };

        audio.onplay = () => {
        _this.isPlaying = true;
        pauseIcon.classList.remove("hide");
        playIcon.classList.add("hide");
        };

        audio.onpause = () => {
        _this.isPlaying = false;
        pauseIcon.classList.add("hide");
        playIcon.classList.remove("hide");
        };

        // thời gian bài hát
        audio.ontimeupdate = () => {
        progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
        startTimeSpan.textContent = this.formatTime(audio.currentTime);
        endTimeSpan.textContent = this.formatTime(audio.duration);
        };

        // xử lý khi tua
        progress.oninput = () => {
        const seekTime = (progress.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        };

        // xử lý khi next bài
        nextBtn.onclick = () => {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.nextSong();
        }
        _this.loadCurrentSong();
        audio.play();
        _this.render();
        };

        // xử lý khi prev bài
        preBtn.onclick = () => {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.prevSong();
        }
        _this.loadCurrentSong();
        audio.play();
        _this.render();
        };

        // random bài
        ranBtn.onclick = () => {
        _this.isRandom = !_this.isRandom;
        shuffle.classList.toggle("active", _this.isRandom);
        };
        // lặp lại bài hát
        repeatBtn.onclick = () => {
        _this.isRepeat = !_this.isRepeat;
        repeat.classList.toggle("active", _this.isRepeat);
        };
        // tự động chuyển bài khi hết
        audio.onended = () => {
        if (_this.isRepeat) {
            audio.play();
        } else {
            nextBtn.click();
        }
        };

        // xử lý volumn
        volumnClick.onclick = () => {
        _this.isMute = !_this.isMute;
        if (_this.isMute) {
            tempLastVolumnValue = lastVolumnValue; // Lưu giá trị hiện tại của thanh trượt âm lượng vào biến tạm thời
            lastVolumnValue = 0; // Gán lastVolumnValue thành 0 khi mute
            audio.volume = 0; // Tắt âm lượng nếu đang mute
            muteIcon.classList.remove("hide");
            volumnIcon.classList.add("hide");
            volumnInput.value = 0;
        } else {
            if (tempLastVolumnValue > 0) {
            // So sánh với biến tạm thời tempLastVolumnValue thay vì lastVolumnValue
            audio.volume = tempLastVolumnValue / 100;
            volumnIcon.classList.remove("hide");
            muteIcon.classList.add("hide");
            volumnInput.value = tempLastVolumnValue;
            } else {
            audio.volume = 1;
            volumnIcon.classList.remove("hide");
            muteIcon.classList.add("hide");
            volumnInput.value = 100; // Đặt giá trị thanh trượt thành 100 nếu lastVolumnValue là 0 để hiển thị đúng giá trị âm lượng
            }
        }
        };

        volumnSlider.oninput = (e) => {
        const volumnValue = e.target.value;
        lastVolumnValue = volumnValue;
        const volume = volumnValue / 100;
        audio.volume = volume;
        console.log(lastVolumnValue);
        };

        // click bài hát
        rowSong.onclick = (e) => {
        const songIndex = e.target.closest(".song:not(.playing)");
        if (songIndex) {
            _this.currentIndex = parseInt(songIndex.dataset.index, 10);
            _this.loadCurrentSong();
            audio.play();
            _this.render();
        }
        };
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        thumb.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        author.textContent = this.currentSong.singer;

        audio.onloadedmetadata = () => {
        endTimeSpan.textContent = this.formatTime(audio.duration);
        };
    },

    formatTime: function (timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
        ).padStart(2, "0")}`;
        return formattedTime;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let randomIndex;
        do {
        randomIndex = Math.floor(Math.random() * this.songs.length);
        } while (randomIndex === this.currentIndex);
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },
    start: function () {
        this.defineProperties();
        this.render();
        this.handleEvent();
        this.loadCurrentSong();
    },
    };

    app.start();
