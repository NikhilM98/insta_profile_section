$( document ).ready(function() {   
    var last_known_scroll_position = 0;
    var navMode = 1;
    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        if (last_known_scroll_position > 150 && navMode === 1) {
            document.getElementById('instatext').classList.add("animateIG");
            document.getElementById('customnav').classList.add("animateIG");
            document.getElementById('nav-seperator-line').classList.add("animateIG");
            navMode = 2;
        } else if (last_known_scroll_position < 150 && navMode === 2){
            document.getElementById('instatext').classList.remove("animateIG");
            document.getElementById('customnav').classList.remove("animateIG");
            document.getElementById('nav-seperator-line').classList.remove("animateIG");
            navMode = 1;
        }
    });
    window.addEventListener('resize', function() {
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
    document.getElementById("navsearchinputplaceholder");
    document.getElementById("navsearchinputplaceholder").addEventListener("click", function () {
        document.getElementById('navsearchinput').focus();
    });
    $(".navsearchinput").focus(function(){
        document.getElementById("navsearchinputplaceholder").style.display="none";
    });
    $(".navsearchinput").blur(function(){
        if (document.getElementById('navsearchinput').value == '') {
            document.getElementById("navsearchinputplaceholder").style.display="block";
        }
    });
});

function requestData() {
    $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=3600692128.f39517f.f70061e11424467a92c95f70311074c5',function (insta) {
        document.getElementById("image-container").innerHTML=`<img class="image-profile" src=`+insta.data["0"].user.profile_picture+`>`;
        document.getElementById('profile-info-header-username').innerHTML=insta.data["0"].user.username;
        insta.data.forEach(inst => {
            var profileContainer = document.getElementById("profile-body");
            var newdiv = document.createElement('div');
            newdiv.innerHTML = 
            `<div class="profile-body-three">
                <div class="profile-body-image-container" style="background:url(` + inst.images.standard_resolution.url + `); background-size: cover; background-position: center;">
                </div>
                <div class="profile-body-image-layer curz">
                    <div class="profile-body-layer-icons-cont">
                        <img src="img/insta-likes.png">
                        <div>`+inst.likes.count+`</div>
                    </div>
                    <div class="profile-body-layer-icons-cont">
                        <img src="img/insta-comment.png">
                        <div>`+inst.comments.count+`</div>
                    </div>
                </div>
            </div>`;
            profileContainer.appendChild(newdiv.firstChild);
        });
        console.log(insta);
        document.getElementById('profile-main-body').style.height=document.body.clientHeight+'px';
    });  
}
requestData();