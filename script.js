function main() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        document.querySelector(".loader h1").innerText = "Something went wrong."
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById("video");
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function(e) {
                video.style.display = 'block';
                document.querySelector(".loader").style.display = 'none';
                video.play();
            };
        })
        .catch(err => {
            document.querySelector(".loader h1").innerText = "Error: " + err;
        })
}

main()