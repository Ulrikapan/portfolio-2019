
$(document).ready(function(){
  function windowToTop(){
    $(window).scrollTop(0);
  };
  // --- loading 處理 start --- //
  $('#loading').fadeOut(100);
  // --- loading 處理 end --- //

  // --- smooth scroll start---//
  // -滑動頁面至頁面錨點
  $(this).on('click','a',function(e){
    // 先取消a標籤的預設動作
    if ($(this).hasClass('scrollAnchor')){
      e.preventDefault();
      var target= $(e.target).attr('href');
      $('html,body').animate({
        scrollTop: $(target).offset().top
      },1000);
    }else{
      return;
    }
  });
  // --- smooth scroll end ---//


  // --- Document OnScroll start---//
  var lastScrollTop =0;

  $(this).on('scroll',function(){

  /* menu Bar 捲軸往上滑時顯示選單/往下滑則隱藏 */
    // console.log($(this).scrollTop())

      var 
          currentScrollTop = $(this).scrollTop(),
          toTop = $('.toTop'),
          myNavbar = $('#myNavbar'),
          footerHeight = $('#footer').outerHeight(),
          toTopHeight = $('.toTop').outerHeight(),
          footerOffsetTop = $('footer').offset().top,
          sectionContainerHeight = $('#section_container').outerHeight();
          windowHeight = $(window).outerHeight(),
          jsTimeline = $('.js-timeline'),
          jsTimelineOffsetTop = jsTimeline.offset().top;

    // scroll down
    if( currentScrollTop > lastScrollTop){
      myNavbar.addClass('nav_hidden');
      if(!toTop.hasClass('toTop_atBottom')){
      toTop.addClass('toTop_hidden');
      }
    }
    // scroll up
    else{
      myNavbar.removeClass('nav_hidden');
      if(!toTop.hasClass('toTop_atBottom')){
          toTop.removeClass('toTop_hidden');
      }
    }
    // 持續更新lastScrollTop
    lastScrollTop = currentScrollTop;
    
  /* 避免safari捲軸至最上方時ScrollTop會小於零 */
    if (lastScrollTop < 0 ){
      lastScrollTop = 0;
    };

  /* toTop fixed to relative 往下滾時顯示，滾至定位時取消fixed*/
      if(currentScrollTop + windowHeight > footerOffsetTop){
          toTop.addClass('toTop_atBottom')
      }else{
          toTop.removeClass('toTop_atBottom')
      }

  /* about section experience tabSlides 的捲軸進度條*/
      
      // if( currentScrollTop - 763 < -100){
      //     jsTimeline.css("height", '0px')
      // }else if(currentScrollTop - 763 > 1450){
      //     jsTimeline.css("height", "100%")
      // }else{
      //     jsTimeline.css("height", currentScrollTop - 763 + 250 +'px');
      // };


      if( currentScrollTop < jsTimelineOffsetTop - $(window).height() / 2 ){
          jsTimeline.css("height", '0px')
      }else if ( currentScrollTop >= $(document).height() - $(window).height()){
          jsTimeline.css("height", '100%');
      }else{
          jsTimeline.css("height", currentScrollTop - jsTimelineOffsetTop + 450 +'px');
      };
  });
  // --- Document OnScroll end---//



  // --- 切換按鈕 start ---// 
  /*切換about me /my works頁面 */
  var myNavbarToggleBtn = $('#myNavbar__toggleBtn'),
      myNavbarToggleBtnGroup = $('.myNavbar__toggleBtn'),
      checkboxLabel = $('.checkbox_label'),
      labelText = $('.label_text'),
      sectionContainer = $('#section_container'),
      sectionAbout = $('#section_about'),
      sectionWorks = $('#section_works'),
      lampAnimate = $('.lamp-animate'),
      lightShadow = $('.light-shadow'),
      bulb = $('.bulb'),
      brick = $('.brick'),
      spotLight = $('.spotlight');

  function aboutSectionShow (){
      windowToTop();
      // checkboxLabel.find(labelText).text('About');
      myNavbarToggleBtn.attr("checked", true);
      myNavbarToggleBtn.attr("data-toggle", 'InAbout');
      myNavbarToggleBtnGroup.attr("title", "看作品集");
      checkboxLabel.find(labelText).text('Works');
      sectionContainer.animate({backgroundColor: "#3C3B4D"},800);
      sectionWorks.addClass('js-noShow');
      sectionAbout.removeClass('js-noShow');
      bulb.addClass('js-bulb_closeLight',800);
      bulb.removeClass('js-bulb_openLight');
      lightShadow.addClass('js-lightShadow_closeLight');
      brick.addClass('js-brick_closeLight',800);
      spotLight.addClass('js-spotlight_closeLight',800);
      spotLight.removeClass('js-spotlight_openLight');
      location.hash = '#about';
      
  };

  function worksSectionShow (){
      windowToTop();
      // checkboxLabel.find(labelText).text('Works');
      myNavbarToggleBtn.attr("checked", false);
      myNavbarToggleBtn.attr("data-toggle", 'InWorks');
      myNavbarToggleBtnGroup.attr("title", "看關於我");
      checkboxLabel.find(labelText).text('About');
      sectionContainer.animate({backgroundColor: "#FEE7D3"},800);
      sectionAbout.addClass('js-noShow');
      sectionWorks.removeClass('js-noShow');
      bulb.removeClass('js-bulb_closeLight',800);
      bulb.addClass('js-bulb_openLight');
      lightShadow.removeClass('js-lightShadow_closeLight', 1000);
      brick.removeClass('js-brick_closeLight',800);
      spotLight.removeClass('js-spotlight_closeLight',800);
      spotLight.addClass('js-spotlight_openLight');
      location.hash = '#works';

      
  }

  myNavbarToggleBtn.on('click', function() {
      // ABOUT ME section
    if(myNavbarToggleBtn.prop("checked")){
      aboutSectionShow ();
      // MY WORKS section
    }else{
      worksSectionShow ();
    };
  });


  if(location.hash == '#about'){
    aboutSectionShow ();
  }else if (location.hash == '#works'){
    worksSectionShow ();
  }else{
    worksSectionShow ();
  }
  // --- 切換按鈕 end ---// 




  // --- section Content start ---//
  /* about section 頁籤切換*/
  $('#tab_slide').each(function(){

    var tabSlide = $(this),
        tabContainers = tabSlide.find('.tab_containers'),
        Container = tabContainers.find('.tab_container'),
        nav = $('.about_nav'),
        // 記錄目前slide的序號
        currentIndex,
        index,
        tabTop = nav.offset().top + 30;
    
    // 先隱藏內容，點擊tab再展開
    // tabSlide.hide();
    
    $('.myNavbar__toggleBtn').on('click', function(){
      goToSlide(0); 
    })
    
    
    // 點擊錨點時顯示對應的slide
    nav.find('li').on('click', function(e){

      e.preventDefault();
      // 如果所點擊的a沒有active class,
      if(!$(this).find('a').hasClass('active')){
        // .index方法，可回傳目標物件其所屬兄弟元素間的序號，從0開始
        goToSlide($(this).index());
        // 展開
        // tabSlide.slideDown();
      $('body').animate({
          scrollTop: nav.offset().top + 30
      }, 500, 'swing');

      $(window).scrollTop(400);
      };
      // 頁面滾至上方

      
    });
    
    // 定義function 顯示對應的slide
    function goToSlide(index){
      var tabSlideHeight = $('.tab_container').eq(index).height();
      nav.find('a').eq(index).addClass('active');
      tabContainers.css("transform","translateX("+ -100 * index +"%)").css('height', tabSlideHeight + 140 +'px');
      /*記錄目前slide的序號*/
      currentIndex = index;
      updateNav();
    };
    
    
    //定義function 更新tab狀態
    function updateNav(){
      /*先把錨點的active class清掉，再依據當前slide的序號加入active class*/
      nav.find('a').removeClass('active').eq(currentIndex).addClass('active');
    };

  });
  // --- section Content end ---//



  // --- Avatar Svg Animation start---//
  /* 設定變數 */
  var avatar = $('#avatar'),
      avatar_bg = $('#avatar_bg'),
      avatarCanvas = $('.avatarCanvas'),
      skip_btn = $('.skip_btn'),
      welcome_content = $('.welcome_content'),
      content01 = $('.content01'),
      content02 = $('.content02'),
      content03 = $('.content03'),
      avatarHead = $('#head'),
      avatarBody = $('#body'),
      neck = $('#neck'),
      hair_left = $('#hair_left'),
      hair_right = $('#hair_right'),
      ear_left = $('#ear_left'),
      ear_right = $('#ear_right'),
      fringe = $('#fringe'),
      mouth_bite = $('#mouth_bite'),
      mouth_woo = $('#mouth_woo'),
      mouth_eat = $('#mouth_eat'),
      mouth_eat2 = $('#mouth_eat2'),
      mouth_smile = $('#mouth_smile'),
      eyebrow = $('#eyebrow'),
      eyes = $('#eyes'),
      blush = $('#blush'),
      right_arm_0 = $('#right_arm_0'),
      left_arm_0 = $('#left_arm_0'),
      right_arm_1 = $('#right_arm_1'),
      right_arm_1_arm = $('#right_arm_1_arm'),
      right_arm_1_hand = $('#right_arm_1_hand'),
      left_arm_1 = $('#left_arm_1'),
      left_arm_1_arm = $('#left_arm_1_arm'),
      left_arm_1_hand = $('#left_arm_1_hand'),
      shine_right_star_1 = $('#shine_right_star_1'),
      shine_right_star_2 = $('#shine_right_star_2'),
      shine_right_star_3 = $('#shine_right_star_3'),
      shine_left_star_1 = $('#shine_left_star_1'),
      shine_left_star_2 = $('#shine_left_star_2'),
      shine_left_star_3 = $('#shine_left_star_3'),    
      pizza_group = $('#pizza_group'),
      bited = $('#bited'),
      stingies = $('#stingies'),
      pizza = $('#pizza'),
      drip1 = $('#drip1'),
      drip2 = $('#drip2'),
      drip3 = $('#drip3'),
      drip3_1 = $('#drip3_1'),
      cocktailnlight_1 = $('#cocktailnlight_1'),
      lemon = $('#lemon'),
      light_none = $('#light_none'),
      cup = $('#cup'),
      juice = $('#juice'),
      section_home = $('.section_home'),
      section_home_bg = $('.section_home_bg'),
      setionContainer = $('#section_container'),
      header = $('#header'),
      footer = $('#footer'),
      tl_avatar;


  /* 建立timeline */

  tl_avatar = new TimelineLite();

  /* 元素設定初始狀態*/
  tl_avatar.set(mouth_bite, {autoAlpha: 0, x: "-=40px", y: "-=10px"});
  tl_avatar.set(mouth_woo, {autoAlpha: 0, scale: 0, y: "-=5px"});
  tl_avatar.set(mouth_eat, {autoAlpha: 0, x: "-=40px", y: "-=5px", scaleY: .8, scaleX: .9});
  tl_avatar.set(mouth_eat2, {autoAlpha: 0, x: "-=40px", y: "-=5px"});
  tl_avatar.set(pizza_group, {autoAlpha: 0})
  tl_avatar.set(stingies, {autoAlpha: 0});
  tl_avatar.set(drip1, {autoAlpha: 0, scaleY: 0});
  tl_avatar.set(drip2, {autoAlpha: 0, scaleY: 0});
  tl_avatar.set(drip3, {autoAlpha: 0, scaleY: 0});
  tl_avatar.set(drip3_1, {autoAlpha: 0});
  tl_avatar.set(shine_right_star_1, {autoAlpha: 0});
  tl_avatar.set(shine_right_star_2, {autoAlpha: 0});
  tl_avatar.set(shine_right_star_3, {autoAlpha: 0});
  tl_avatar.set(shine_left_star_1, {autoAlpha: 0, y: "+=30px"});
  tl_avatar.set(shine_left_star_2, {autoAlpha: 0, y: "+=30px"});
  tl_avatar.set(shine_left_star_3, {autoAlpha: 0, y: "+=30px"});
  tl_avatar.set(cocktailnlight_1, {autoAlpha: 0, y: "-=20px"});
  tl_avatar.set(left_arm_1, {autoAlpha: 0});
  tl_avatar.set(right_arm_1, {autoAlpha: 0, y: "+=10px"});
  tl_avatar.set(hair_right, {autoAlpha: 0});


  /* 動畫設定 */

  tl_avatar
    // 背景出現
    .from(avatar_bg ,.5, {yPercent: 50, xPercent: 50, autoAlpha: 0, scale: 0 ,ease: Back.easeOut})
    // 人物出現
    .from(avatar, 1, {xPercent: 25, yPercent: 50, autoAlpha: 0, scale: .5, ease: Elastic.easeOut}, "+=.3")
    // 右手舉起
    .to(left_arm_0, .5,{ autoAlpha: 0, ease: Back.easeInOut})
    .to(left_arm_1, .5, { autoAlpha: 1, ease: Back.easeInOut}, "-=.4")
    // 揮手
    .to(left_arm_1_hand, .4, { rotation: 10, transformOrigin: "center bottom"}, "cut2")
    .to(left_arm_1_hand, .4, { rotation: 0, transformOrigin: "center bottom"})
    .to(left_arm_1_hand, .4, { rotation: 10, transformOrigin: "center bottom"})
    .to(left_arm_1_hand, .4, { rotation: 0, transformOrigin: "center bottom"})
    // 第一段文字出現
    .from(welcome_content, .7, { autoAlpha: 0, width: 0, padding: '0px 0px'}, "cut2")
    // 第一段文字消失
    .to(welcome_content, .5, { width: 0, padding: '0px 0px'}, "cut3")
    .to(content01, .5 ,{ display: "none"}, "cut3")
    // 第二段文字出現
    .fromTo(welcome_content, .8, {width: 0},{ width: "+=300px", padding: '0px 10px'}, "cut4")
    .to(content02, .8 ,{ display: "inline-block"}, "cut4")
    // Pizza出現
    .to(pizza_group, 1, { autoAlpha: 1, y: "+=15px", ease: Power4.easeOut}, "cut5")
    .to(shine_left_star_1, .5, {autoAlpha: 1, y: "-=15px", ease: Power4.easeOut}, "cut5")
    .to(shine_left_star_1, .2, {autoAlpha: 0, ease: Power4.easeOut})
    .to(shine_left_star_2, .7, {autoAlpha: 1, y: "-=15px", ease: Power4.easeOut}, "cut5+=.3")
    .to(shine_left_star_2, .2, {autoAlpha: 0, ease: Power4.easeOut})
    .to(shine_left_star_3, .9, {autoAlpha: 1, y: "-=15px", ease: Power4.easeOut}, "cut5+=.5")
    .to(shine_left_star_3, .2, {autoAlpha: 0, ease: Power4.easeOut})
    // Pizza 滴下
    .to(drip1, .3, {autoAlpha: 1, scaleY: 1, ease: Back.easeOut} ,"-=.4")
    .to(drip2, .3, {autoAlpha: 1, scaleY: 1, ease: Back.easeOut} ,"-=.4")
    .to(drip3, .3, {autoAlpha: 1, scaleY: 1, ease: Back.easeOut} ,"-=.4")
    .to(drip3_1, .3, {autoAlpha: 1, scaleY: 1, ease: Back.easeOut}, "-=.4")

    // 表情
    .to(mouth_smile, .4, {autoAlpha: 0}, "cut5")
    .to(mouth_woo, .3, {autoAlpha: 1, scale: 1,x: "-=60px"}, "cut5")
    .to(hair_left, .4 ,{autoAlpha: 0,ease: Back.easeOut}, "cut5")
    .to(hair_right, .3 ,{autoAlpha: 1,ease: Back.easeOut}, "cut5")
    .to(ear_left, .3 ,{autoAlpha: 0}, "cut5")
    .to(eyes, .3, {x: "-=30px"}, "cut5")
    .to(eyebrow, .3, {x: "-=30px" , y: "-=10px"}, "cut5")
    .to(blush, .3, {x: "-=30px"}, "cut5")
    .to(fringe, .3, {x: "-=30px"}, "cut5")

    // Pizza 咬一口
    .to(mouth_bite, .3 , {autoAlpha: 1}, "cut6")
    .to(mouth_woo, .3 , {autoAlpha: 0} , "cut6")
    .to(avatarHead, .3 ,{rotation: "-3", transformOrigin:"center bottom", y: "+=10px", ease: Power4.easeOut})
    .to(neck, .3 ,{y: "+=5px", ease: Power4.easeOut}, "-=.3")
    .to(mouth_bite, .2, {autoAlpha: 0}, "-=.1")
    .to(mouth_eat, .2 , {autoAlpha: 1})
    .to(mouth_eat, .2, {scaleY: .5}, "-=.1")
    .to(eyebrow, .2, {x: "-=0px" , y: 0}, "-=.2")
    .to(bited, .4, {x: "+=30px", ease: Back.easeOut}, "cut7")
    .to(stingies, .4, {x: "+=35px", autoAlpha: 1, ease: Back.easeOut}, "cut7")
    .to(avatarHead, .2 ,{rotation: 0, transformOrigin:"center bottom", ease: Power4.easeOut, y: 0},"cut7")
    .to(neck, .2 ,{y: 0, ease: Power4.easeOut}, "cut7")
    .to(bited, .2, {autoAlpha: 0})
    .to(stingies, .2, {autoAlpha: 0}, "-=.2")

    // 頭歸位 咀嚼
    .to(mouth_eat, .15, {scaleY: .5})
    .to(avatarHead, .15 , {y: 0}, "-=.15")
    .to(mouth_eat, .15, {scaleY: .8})
    .to(mouth_eat, .15, {scaleY: 1, y: "+=4px"})
    .to(avatarHead, .15 , {y: "+=4px"}, "-=.15")
    .to(neck, .15 ,{y: "+=1px", ease: Power4.easeOut}, "-=.15")
    .to(mouth_eat, .15, {scaleY: .8})
    .to(mouth_eat, .15, {scaleY: .5, y: 0})
    .to(avatarHead, .15 , {y: 0}, "-=.15")
    .to(neck, .15 ,{y: 0, ease: Power4.easeOut}, "-=.15")
    .to(mouth_eat, .15, {scaleY: .8})
    .to(mouth_eat, .15, {scaleY: 1, y: "+=4px"})
    .to(avatarHead, .15 , {y: "+=4px"}, "-=.15")
    .to(neck, .15 ,{y: "+=1px", ease: Power4.easeOut}, "-=.15")
    .to(mouth_eat, .15, {scaleY: .8})
    .to(mouth_eat, .15, {scaleY: .5, y: 0})
    .to(avatarHead, .15 , {y: 0}, "-=.15")
    .to(neck, .15 ,{y: 0, ease: Power4.easeOut}, "-=.15")
    .to(mouth_eat, .15, {scaleY: .8})
    .to(mouth_eat, .15, {scaleY: 1, y: "+=4px"})
    .to(avatarHead, .15 , {y: "+=4px"}, "-=.15")
    .to(neck, .15 ,{y: "+=1px", ease: Power4.easeOut}, "-=.15")

    // 第二段文字消失
    .to(welcome_content, .5, { width: 0, padding: '0px 0px'}, "cut8")
    .to(content02, .5 ,{ display: "none"}, "cut8")


    // Pizza消失 手放下
    .to(pizza_group, .5, {autoAlpha: 0, y: "+=10px"}, "cut8")
    .to(left_arm_0, .5,{ autoAlpha: 1, ease: Back.easeInOut},"cut8")
    .to(left_arm_1, .5, { autoAlpha: 0, ease: Back.easeInOut}, "cut8-=.1")
    // 右手舉起
    .to(right_arm_0, .5, {autoAlpha: 0, ease: Back.easeInOut}, "cut8+=.2")
    .to(right_arm_1, .5, {autoAlpha: 1, y: 0, ease: Back.easeInOut}, "cut8+=.3")

    // 表情
    .to(mouth_eat, .3 , {autoAlpha: 0}, "cut8+=.2")
    .to(mouth_smile, .3, {autoAlpha: 1}, "cut8+=.2")
    .to(hair_right, .4 ,{autoAlpha: 0,ease: Back.easeOut}, "cut8+=.2")
    .to(hair_left, .3 ,{autoAlpha: 1,ease: Back.easeOut}, "cut8+=.2")
    .to(ear_right, .3 ,{autoAlpha: 0}, "cut8+=.2")
    .to(ear_left, .3 ,{autoAlpha: 1}, "cut8+=.2")
    .to(eyes, .3, {x: "+=30px"}, "cut8+=.2")
    .to(eyebrow, .3, {x: "+=30px"}, "cut8+=.2")
    .to(blush, .3, {x: "+=30px"}, "cut8+=.2")
    .to(fringe, .3, {x: "+=30px"}, "cut8+=.2")

    // 飲料出現
    .to(cocktailnlight_1, 1, {autoAlpha: 1, y: "+=15px", ease: Power4.easeOut}, "cut9" )
    .to(shine_right_star_1, .5, {autoAlpha: 1, y: "+=10px", ease: Power4.easeOut}, "cut9")
    .to(shine_right_star_1, .2, {autoAlpha: 0, ease: Power4.easeOut})
    .to(shine_right_star_2, .7, {autoAlpha: 1, y: "+=10px", ease: Power4.easeOut}, "cut9+=.3")
    .to(shine_right_star_2, .2, {autoAlpha: 0, ease: Power4.easeOut})
    .to(shine_right_star_3, .9, {autoAlpha: 1, y: "+=10px", ease: Power4.easeOut}, "cut9+=.5")
    .to(shine_right_star_3, .2, {autoAlpha: 0, ease: Power4.easeOut})

    // 第三段文字出現
    .fromTo(welcome_content, .8, {width: 0},{ width: "+=260px", padding: '0px 10px'}, "cut9")
    .to(content03, .8 ,{ display: "inline-block"}, "cut9")

    //文字畫面停
    .to(welcome_content, 1, {autoAlpha: 1})

    // skip btn 消失
    .to(skip_btn, 1, {autoAlpha: 0})

    // 畫面往上
    .to(section_home_bg, 2, {yPercent: "-=100%", ease: Expo.easeOut, onStart: windowToTop} ,"cut10")
    .to(avatarCanvas, 2, {yPercent: "-=98%", ease: Expo.easeOut}, "cut10")


    // 臉部驚訝
    .to(mouth_smile, .2, {autoAlpha: 0}, "cut10")
    .to(mouth_woo, .2, {x: "+=40px", autoAlpha: 1, scale: 1.1}, "cut10")
    .to(eyebrow, .3, {x: "+=5px", y: "-=10px"}, "cut10")

    // 手滑
    .to(right_arm_1_hand, .5, { rotation: 10, transformOrigin: "center bottom"}, "cut10")
    .to(right_arm_1_arm, .5, { rotation: "-10", transformOrigin: "left bottom", x: "+=10px", y: "+=5px"}, "cut10")

    // 杯子掉落
    .to(cocktailnlight_1, 3, {autoAlpha: 1, xPercent: "-=225", yPercent: "-=5",rotation: "+=765", transformOrigin: "center bottom", scale: 2.3}, "cut10")
    .to(juice, 2, {autoAlpha: 0}, "cut10")
    .to(cup, 2, {fill: "#424A56", opacity: 1}, "cut10")
    .to(light_none, 2, {autoAlpha: 0}, "cut10")
    .to(lemon, 2, {xPercent: "-=105%"}, "cut10")



    // 淡出
    .to(avatarHead, 2, {autoAlpha: 0}, "cut10+=1")
    .to(avatarBody, 2, {autoAlpha: 0}, "cut10+=1")
    .to(right_arm_1, 2, {autoAlpha: 0}, "cut10+=1")
    .to(left_arm_0, 2, {autoAlpha: 0}, "cut10+=1")
    .to(neck, 2, {autoAlpha: 0}, "cut10+=1")
    .to(avatar_bg, 2, {autoAlpha: 0}, "cut10+=1")
    .to(welcome_content, 2.5, {autoAlpha: 0}, "cut10+=1" )
    .to(section_home, .3, {opacity: 0.3, onComplete: animateEnd}, "cut10+=2")
    .to(section_home, .1, {opacity: 0} ,"-=.8")
    .to(header, .5, {autoAlpha: 1, onComplete: sectionHomeClose}, "-=1")
    .to(sectionContainer, .5, {autoAlpha: 1})
    


  function animateEnd(){
      var lamp = $('.lamp-animate'),
          bulbLight = $('.bulblight'),
          tl_lamp;

      tl_lamp = new TimelineLite();
      tl_lamp.set(bulbLight, {rotation: "-=90", transformOrigin: "center top"});
      tl_lamp.to(bulbLight, 1, {rotation: "+=90"} );

      // tl_lamp.to(bulbLight, 1, {rotation: "+=90", onComplete: worksSectionShow} );
      // worksSectionShow ();

  };

  function sectionHomeClose(){
      var sectionHome  = $('.section_home');
      sectionHome.addClass('notActive');
  }
  // skip按鈕
  skip_btn.click(
    function(){
      tl_avatar.seek('cut10');
    })
  // --- Avatar Svg Animation end---//



  // --- 電腦版才有的動畫：滑鼠移動效果 start --- //
  // 先判斷是否為智慧型裝置，如果是的話就不跑此段
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if(isMobile === true){
      return false;
    }else{

        // --- 控制燈罩跟著滑鼠跑 window mouse move start ---//
        var windowWidth = $(window).width(),
        halfWindowWidth = windowWidth / 2;

        $(window).mousemove(function(e){
            var pageX = e.pageX,
                lamp = $('.lamp-animate'),
                wallBracketShadow = $('.wall-bracket_shadow'),
                rotateChange = ( pageX - halfWindowWidth ) / 30;
            
            // 限制旋轉角度在15~-15之間
            if (rotateChange > 15 ){
                rotateChange = 15
            }else if (rotateChange < -15){
                rotateChange = -15
            };  

            lamp.css('transform','rotate(' + rotateChange +'deg)');
            wallBracketShadow.css('transform', 'skewX(' + - rotateChange * 1.5 +'deg)');
        })
        // --- 控制燈罩跟著滑鼠跑 window mouse move end ---//


        // --- 作品 滑鼠效果 start --- //

        // $(window).mousemove(function(e){
        //     var worksBox = $('.works-box'),
        //         target = $('.works-wrapper').find('a')
        //     target.mousemove(function(e){
        //         var w = $(this).width(),
        //             h = $(this).height(),
        //             l = $(this).offset().left,
        //             t = $(this).offset().top,
        //             x = e.pageX - l,
        //             y = e.pageY - t,
        //             strength = 8,

        //             offsetX = 0.5 - x / w,
        //             offsetY = 0.5 - y / h,
        //             dy = y - h / 2,
        //             dx = x - w / 2,
        //             transform = 'translate('+ -offsetY * strength +'px ,' + -offsetX * strength + 'px) rotateX(' + (offsetY * strength * 2) + 'deg) rotateY(' + (-offsetX * (strength * 2)) + 'deg) scale(1.05)';
        //         $(this).css('transform', transform);
        //     }),

        //     target.on('mouseout', function(e){
        //         var x = e.pageX,
        //             y = e.pageY,
        //             transform = 'scale(1)';
        //         $(this).css('transform', transform);
        //     })                
        // });
        // --- 作品 滑鼠效果 end --- //
    };
  // --- 電腦版才有的動畫：滑鼠移動效果 end --- //


});


// --- 作品分類 tag 切換 start --- //
$('.works-type-tags').find('.tag').each(function(){
  var workTag = $('.works-type-tags').find('.tag'),
      workTagAttr = $(this).attr('data-type');
  $(this).on('click', function(){
    workTag.removeClass('active');
    $(this).addClass('active');
    $('.work-el').fadeOut(150);
    $('.'+ workTagAttr).fadeIn(400);
  })
})
// --- 作品分類 tag 切換 end --- //

// --- 作品列表 animatedModel start --- //
$("#works32").animatedModal({
    modalTarget:'worksModal-32',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#C6A7D4'
});
$("#works31").animatedModal({
    modalTarget:'worksModal-31',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#C6A7D4'
});
$("#works30").animatedModal({
    modalTarget:'worksModal-30',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#C6A7D4'
});
$("#works29").animatedModal({
    modalTarget:'worksModal-29',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#C6A7D4'
});
$("#works28").animatedModal({
    modalTarget:'worksModal-28',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#C6A7D4'
});

$("#works27").animatedModal({
    modalTarget:'worksModal-27',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#FFCCAA'
    
});
$("#works26").animatedModal({
    modalTarget:'worksModal-26',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#898C8C'
    
});
$("#works25").animatedModal({
    modalTarget:'worksModal-25',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#EABECE'
    
});
$("#works24").animatedModal({
    modalTarget:'worksModal-24',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#EDBF7E'
    
});
$("#works23").animatedModal({
    modalTarget:'worksModal-23',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#59C3F0'
    
});
$("#works22").animatedModal({
    modalTarget:'worksModal-22',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#BECBDA'
    
});
$("#works21").animatedModal({
    modalTarget:'worksModal-21',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#D2B06A'
    
});
$("#works20").animatedModal({
    modalTarget:'worksModal-20',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#A2C7D9'
    
});
$("#works19").animatedModal({
    modalTarget:'worksModal-19',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#87DEDC'
    
});
$("#works18").animatedModal({
    modalTarget:'worksModal-18',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#8E8F8E'
    
});
$("#works17").animatedModal({
    modalTarget:'worksModal-17',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#757FB0'
    
});
$("#works16").animatedModal({
    modalTarget:'worksModal-16',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#DBC8D2'
    
});
$("#works15").animatedModal({
    modalTarget:'worksModal-15',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#DEC495'
    
});
$("#works14").animatedModal({
    modalTarget:'worksModal-14',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#ffbfd2'
    
});
$("#works13").animatedModal({
    modalTarget:'worksModal-13',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#FFD373'
    
});
$("#works12").animatedModal({
    modalTarget:'worksModal-12',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#FEB0BF'
    
});
$("#works11").animatedModal({
    modalTarget:'worksModal-11',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#DDCEE7'
    
});
$("#works10").animatedModal({
    modalTarget:'worksModal-10',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#B3DECE'
    
});
$("#works09").animatedModal({
    modalTarget:'worksModal-09',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#FFC2C2'
    
});

$("#works07").animatedModal({
    modalTarget:'worksModal-07',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#E8DCB5'
    
});
$("#works06").animatedModal({
    modalTarget:'worksModal-06',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#FFC1C2'
    
});
$("#works05").animatedModal({
    modalTarget:'worksModal-05',
    animatedOut:'bounceOut',
    animationDuration: '.75s',
    color: '#EFB8A0'
    
});


// --- 作品列表 animatedModel end --- //







