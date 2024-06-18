import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [articles, setArticles] = useState([]);

  const handleSearch = (keyword,interval,unit) => {
    fetch(`/search?keyword=${keyword}&interval=${interval}&unit=${unit}`)
        .then((response) => response.json())
        .then((data) => {setArticles(data);                 console.log(data)        })
        .catch((error) => console.error('Error fetching news:', error));
};
 // Sample response data
 const sampleArticle = {
  "2024-06-18T12:00+05:30[Asia/Kolkata]": [
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Valentina Palladino",
          "title": "WWDC 2024: Everything Apple announced today including iOS 18, AI with Apple Intelligence and more",
          "description": "Today's keynote for Apple's Worldwide Developers Conference teased a lot of what users can expect later this year when all of its major software updates roll out. Big changes coming to iOS 18, macOS Sequoia and watchOS 11 include RCS support, a new Passwords …",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_8823786c-90f4-4b30-8198-1d295ab9a66c",
          "urlToImage": null,
          "publishedAt": "2024-06-10T18:44:22Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Devindra Hardawar",
          "title": "Apple's AI push will reportedly be called Apple Intelligence, of course",
          "description": "Just a few days before Apple's Worldwide Developer's Conference (WWDC 2024) kicks off, Bloomberg's Mark Gurman has delivered his final round of party-spoiling details. The biggest takeaway: Apple will call its long-rumored artificial intelligence play \"Apple …",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_3beaf018-e403-4758-9b9a-93b47390be5b",
          "urlToImage": null,
          "publishedAt": "2024-06-07T13:48:41Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Andrew Webster",
          "title": "Apple’s Pachinko returns for season 2 in August",
          "description": "Apple has announced that season 2 of Pachinko, its generation-spanning historical drama, will start streaming on Apple TV Plus in August.",
          "url": "https://www.theverge.com/2024/5/30/24167812/pachinko-season-2-apple-tv-plus-release-date",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/lJEbJWuLwU6Pm1J_R-PH_uAcAu0=/0x0:3840x1918/1200x628/filters:focal(1920x959:1921x960)/cdn.vox-cdn.com/uploads/chorus_asset/file/25470597/Pachinko_203_F00314F.jpg",
          "publishedAt": "2024-05-30T21:00:00Z",
          "content": "Apples Pachinko returns for season 2 in August\r\nApples Pachinko returns for season 2 in August\r\n / The generation-spanning drama will start streaming again in the summer.\r\nByAndrew Webster, an entert… [+1439 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Emma Roth",
          "title": "Tim Cook is ‘not 100 percent’ sure Apple can stop AI hallucinations",
          "description": "In an interview with The Washington Post, Apple CEO Tim Cook says he’s not 100 percent confident that its new Apple Intelligence system won’t hallucinate.",
          "url": "https://www.theverge.com/2024/6/11/24176035/tim-cook-apple-stop-ai-hallucinations",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/6cTXhpfh6JfwBL4B40-dagsXlNU=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/25345071/STK468_APPLE_ANTITRUST_CVIRGINIA_I.jpg",
          "publishedAt": "2024-06-11T14:22:54Z",
          "content": "Tim Cook is not 100 percent sure Apple can stop AI hallucinations\r\nTim Cook is not 100 percent sure Apple can stop AI hallucinations\r\n / Theres still a chance Apple Intelligence could produce false o… [+2253 chars]"
      },
      {
          "source": {
              "id": "wired",
              "name": "Wired"
          },
          "author": "Will Knight",
          "title": "Apple Proved That AI Is a Feature, Not a Product",
          "description": "Other tech companies want to sell you chatbots. Apple’s demos show the value of seeing the AI as an integrated, holistic experience rather than a stand-alone app or device.",
          "url": "https://www.wired.com/story/apple-intelligence-ai-feature-not-product/",
          "urlToImage": "https://media.wired.com/photos/666a406ecd2db4ffb305956c/191:100/w_1280,c_limit/WWDC-2024-AI-Fast-Forward-Business-2156971852.jpg",
          "publishedAt": "2024-06-13T16:00:00Z",
          "content": "Apple's otherworldly, flying-saucer headquarters in Cupertino, California, felt like a suitable venue this week for a bold and futuristic revamp of the companys most prized products. With iPhone sale… [+3390 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Justine Calma",
          "title": "Apple wants to know if you’re hearing things because of tinnitus",
          "description": "Apple and University of Michigan researchers shared preliminary data from a large study of tinnitus among adults.",
          "url": "https://www.theverge.com/2024/5/28/24166143/apple-study-tinnitus-research-app-preliminary-data",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/xR_04L4hMaOHPWLNRC2H-WiJSmU=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24492430/STK459_Music_Headphones.jpg",
          "publishedAt": "2024-05-28T15:17:12Z",
          "content": "Apple wants to know if youre hearing things because of tinnitus\r\nApple wants to know if youre hearing things because of tinnitus\r\n / Apple funds a study on tinnitus, often described as ringing in the… [+3455 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Sam Rutherford",
          "title": "In case there weren't enough emoji already, Apple's Genmoji uses AI to generate even more",
          "description": "Currently, Unicode 15.1 supports just shy of 3,800 various emoji. But for everyone out there that for some reason thinks that's not nearly enough, today at WWDC 2024, Apple announced the ability to use AI to generate unique emoji based on your prompts.\nCalled…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_cf657862-687d-41a8-a095-3daf3208a00b",
          "urlToImage": null,
          "publishedAt": "2024-06-10T20:00:11Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Devindra Hardawar",
          "title": "Apple Vision Pro features we'd love to see at WWDC 2024",
          "description": "A year since Apple unveiled the Vision Pro, and about four months since its muted launch, the spatial computing headset still feels surprisingly undercooked. Simple features, like the ability to organize icons in the visionOS home screen, are nowhere to be fo…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_bca7453c-ce9e-4595-b255-b31825b831ec",
          "urlToImage": null,
          "publishedAt": "2024-06-07T15:18:22Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": "wired",
              "name": "Wired"
          },
          "author": "Marah Eakin",
          "title": "I Spent an Hour in Marvel’s Apple Vision Pro 'What If...?' Experience. I’m Still Not Sure Why",
          "description": "The new \"What If…?\" experience for Vision Pro is a win-win for Marvel and Apple. But it’s not built for—or accessible to—everyone.",
          "url": "https://www.wired.com/story/marvel-apple-vision-pro-what-if/",
          "urlToImage": "https://media.wired.com/photos/66565b792a8564947bc5ed92/191:100/w_1280,c_limit/Marvel-Apple-Vision-Pro-Culture-WhatIfImmersive_Screenshot_DangerousVariants.jpg",
          "publishedAt": "2024-05-29T19:00:00Z",
          "content": "On its surface, Marvels new immersive story What If?, available to Apple Vision Pro users starting Thursday, seems like a win-win. Marvel gets to mess around with how to combine storytelling and spat… [+2761 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Kris Holt",
          "title": "Apple WWDC 2024: What we expect including iOS 18 updates, AI and more",
          "description": "It'll soon be Apple's turn to talk about its next major operating system updates, giving developers a chance to get their apps ready ahead of a broad rollout this fall. The company's Worldwide Developers Conference is right around the corner. Apple is sure to…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_753d45f9-854d-4355-95bf-0a56b2ba8b6e",
          "urlToImage": null,
          "publishedAt": "2024-06-04T16:29:40Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Dua Rashid",
          "title": "The Best Gadgets of May 2024",
          "description": "May was a loaded month with Apple and Google both releasing products. Project Astra was definitely the most interesting thing we saw at an otherwise boring Google I/O. Apple also dropped its latest iPad Pros with the all-new M4 chip and OLED displays, a 13-in…",
          "url": "https://gizmodo.com/best-gadgets-of-may-2024-1851511825",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/a5ea1059c9b89a49ff8bc86d2c62c043.jpg",
          "publishedAt": "2024-05-31T19:00:00Z",
          "content": "Starting at $1,000, the iPad Pro with an M4 chip is beautiful and powerful. And in a lot of ways, try to even out-MacBook the MacBook. Thanks to a new OLED screen and chip, hardware-wise, its as clos… [+158 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Maxwell Zeff",
          "title": "Apple Won't Pay for ChatGPT, Will You?",
          "description": "Apple and OpenAI announced a landmark partnership this week to ingrain ChatGPT into every new iPhone, iPad, and Mac. The agreement has obvious benefits for Apple, giving it the best AI chatbot on the market. However, Apple will not pay OpenAI to use ChatGPT o…",
          "url": "https://gizmodo.com/apple-openai-chatgpt-apple-intelligence-iphone-ipad-1851537642",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/328bf2c4e2f291bc9a82b9a4ffb80805.jpg",
          "publishedAt": "2024-06-13T14:40:00Z",
          "content": "Apple and OpenAI announced a landmark partnership this week to ingrain ChatGPT into every new iPhone, iPad, and Mac. The agreement has obvious benefits for Apple, giving it the best AI chatbot on the… [+2651 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Cheyenne MacDonald",
          "title": "Apple will reportedly offer higher trade-in credit for old iPhones for the next two weeks",
          "description": "It might be a good time to finally upgrade your iPhone if you’ve been hanging onto an older model — according to Bloomberg’s Mark Gurman, Apple will be offering a little more than usual for some trade-ins starting next week in the US and Canada. The company i…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_3a5801c0-3734-4f16-8140-fc99f7244c54",
          "urlToImage": null,
          "publishedAt": "2024-05-18T20:52:40Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Lawrence Bonk",
          "title": "Apple built a Tetris clone for the iPod but never released it",
          "description": "Apple once designed a Tetris clone that has been found on a prototype version of the third-generation iPod, indicating the company was experimenting with releasing the game on the music player. It’s called Stacker and, obviously, is controlled via the iPod’s …",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_196e88c5-1480-4ca2-8122-315465e925f9",
          "urlToImage": null,
          "publishedAt": "2024-05-24T17:38:11Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Lawrence Bonk",
          "title": "VR classics Job Simulator and Vacation Simulator come to Apple Vision Pro",
          "description": "The Apple Vision Pro was marketed primarily as a productivity machine, but as any active VR user can tell you, it’s the games that sell these devices. Apple’s headset offers access to hundreds of games, but mostly as quick and dirty iPad ports that show up as…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_6a6ab0dd-00f8-4399-ad8d-1d7bc76dd1bb",
          "urlToImage": null,
          "publishedAt": "2024-05-28T19:05:45Z",
          "content": "If you click 'Accept all', we and our partners, including 237 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Jay Castello",
          "title": "The five-year journey to make an adventure game out of ink and paper",
          "description": "The Collage Atlas was created by John Evelyn over nearly five years, and after debuting on Apple Arcade, it’s now available on Steam.",
          "url": "https://www.theverge.com/24155754/the-collage-atlas-interview-steam-hand-drawn",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/S545ZUSu2ur1tmGrwKl_A-ZoN1I=/0x0:7680x4320/1200x628/filters:focal(3147x2641:3148x2642)/cdn.vox-cdn.com/uploads/chorus_asset/file/25446300/A_2020_09_17_05_32_29_CollageAtlasShot.png",
          "publishedAt": "2024-05-19T13:00:00Z",
          "content": "The five-year journey to make an adventure game out of ink and paper\r\nThe five-year journey to make an adventure game out of ink and paper\r\n / The Collage Atlas was a labor of love for designer John … [+5330 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Andrew Webster",
          "title": "Apple’s time travel comedy Time Bandits starts streaming in July",
          "description": "Apple TV Plus has revealed the release date for its time travel comedy Time Bandits, which stars Lisa Kudrow and starts streaming on July 24th.",
          "url": "https://www.theverge.com/2024/5/20/24160764/time-bandits-streaming-release-date-apple-tv-plus",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/p4eFWZMn1867TDPOoB3xHv9n3cc=/0x0:5134x3101/1200x628/filters:focal(2567x1551:2568x1552)/cdn.vox-cdn.com/uploads/chorus_asset/file/25456317/Apple_TV_Time_Bandits_key_art_16_9.jpg",
          "publishedAt": "2024-05-20T14:43:54Z",
          "content": "Apples time travel comedy Time Bandits starts streaming in July\r\nApples time travel comedy Time Bandits starts streaming in July\r\n / Its an adaptation of a 1981 film directed by Terry Gilliam.\r\nByAnd… [+1979 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Sarah Fielding",
          "title": "Marvel's What If...? for Apple Vision Pro gets a trailer and release date",
          "description": "Earlier this month, Marvel and ILM Immersive announced that What If...? would be coming to the Apple Vision Pro in the form of an \"immersive story\" based on the Disney+ original. The original announcement didn't offer much in the way of detail but now we've g…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_c5645cfb-daef-4a4c-bdbd-8dfdae381e70",
          "urlToImage": null,
          "publishedAt": "2024-05-22T15:00:08Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Devindra Hardawar",
          "title": "Marvel's \"What If...?\" for Apple Vision Pro looks incredible, but plays terribly",
          "description": "The Watcher stood tall in my family room, bald and berobed, nestled amongst my kids' toys, sleeping cats and TV. I was being asked to help save the multiverse! So began Marvel and ILM Interactive's What If...? on the Apple Vision Pro. Like the Disney+ series …",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_89174320-5840-454e-be9f-d8b7c72deceb",
          "urlToImage": null,
          "publishedAt": "2024-05-31T14:30:28Z",
          "content": "If you click 'Accept all', we and our partners, including 237 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Wes Davis",
          "title": "Apple Intelligence: every new AI feature coming to the iPhone and Mac",
          "description": "These are all of the biggest AI features Apple announced are coming to its iPhone, iPad, Mac, and more at WWDC 2024.",
          "url": "https://www.theverge.com/2024/6/10/24175405/wwdc-apple-ai-news-features-ios-18-macos-15-iphone-ipad-mac",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/dYZO72VW-nmwCObpFh-FjnIaXIE=/0x0:1527x856/1200x628/filters:focal(764x428:765x429)/cdn.vox-cdn.com/uploads/chorus_asset/file/25485545/lcimg_ca61fcb8_ae16_4dcb_8b5a_e5ca6510cfad.jpeg",
          "publishedAt": "2024-06-10T18:11:00Z",
          "content": "Apple Intelligence: every new AI feature coming to the iPhone and Mac\r\nApple Intelligence: every new AI feature coming to the iPhone and Mac\r\n / AI comes to Cupertino.\r\nByWes Davis, a weekend editor … [+2606 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Wes Davis",
          "title": "Apple’s WWDC may include AI-generated emoji and an OpenAI partnership",
          "description": "Apple will announce iOS and macOS features like AI summaries and writing suggestions, AI-created emoji at WWDC, along with a new OpenAI chatbot partnership.",
          "url": "https://www.theverge.com/2024/5/26/24165040/apple-wwdc-2024-ai-openai-ios-18-macos-15-iphone-macbook",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/x2E5qk82ChtE9vZvW1p2duIOnxA=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24401980/STK071_ACastro_apple_0003.jpg",
          "publishedAt": "2024-05-26T15:03:11Z",
          "content": "Apples WWDC may include AI-generated emoji and an OpenAI partnership\r\nApples WWDC may include AI-generated emoji and an OpenAI partnership\r\n / Apple is preparing to play its generative AI cards.\r\nByW… [+2585 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Jay Peters",
          "title": "The AI upgrade cycle is here",
          "description": "The new Apple Intelligence features coming to iOS 18 could be impressive, but they might also just be driving another upgrade cycle.",
          "url": "https://www.theverge.com/2024/6/12/24176494/apple-intelligence-ai-upgrade-cycle-here",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/P5dOxew0xBSysV0lIfow9ik4eso=/0x0:2040x1360/1200x628/filters:focal(1309x713:1310x714)/cdn.vox-cdn.com/uploads/chorus_asset/file/24931973/236794_iPhone_15_pro_pro_Max_VPavic_0017.jpg",
          "publishedAt": "2024-06-12T12:00:00Z",
          "content": "The AI upgrade cycle is here\r\nThe AI upgrade cycle is here\r\n / Will it be worth upgrading your iPhone for Apple Intelligence?\r\nByJay Peters, a news editor who writes about technology, video games, an… [+4024 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "David Pierce",
          "title": "The super simple gadget trying to replace your phone",
          "description": "Plus: the new Apple Passwords app, House of the Dragon season 2, Yahoo News, Fantasmas, Moonbound by Robin Sloan, and more in this week’s Installer newsletter.",
          "url": "https://www.theverge.com/2024/6/16/24178592/light-phone-3-yahoo-news-apple-passwords-installer",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/RBtUBPdicoRZ-U-fBdGBz613Z54=/0x0:2181x1455/1200x628/filters:focal(1091x728:1092x729)/cdn.vox-cdn.com/uploads/chorus_asset/file/25491634/installer_42_2.png",
          "publishedAt": "2024-06-16T12:00:00Z",
          "content": "The super simple gadget trying to replace your phone\r\nThe super simple gadget trying to replace your phone\r\n / Plus, in this weeks Installer: a music history doc youll love, the surprisingly great ne… [+10831 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Kris Holt",
          "title": "Apple is said to be working on a 'significantly thinner' iPhone",
          "description": "Just like it slimmed down the latest iPad Pro\r\n, Apple is said to be looking at making the iPhone more slender. To be more precise, the company is working on a \"significantly thinner\" model that may arrive as part of the iPhone 17 lineup in place of a Plus mo…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_1042bb4a-bf83-457e-9eb9-da7d03e275fc",
          "urlToImage": null,
          "publishedAt": "2024-05-17T18:08:24Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Lawrence Bonk",
          "title": "Apple brings a full-featured Passwords app to the Mac, iPhone, iPad and Windows",
          "description": "The rumors are true. Apple is adding a dedicated passwords manager app\r\n to many of its operating systems. This includes macOS, iPadOS, visionOS and iOS. It’ll even work on Windows by accessing the Windows app via iCloud. That’s pretty neat. There are way too…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_20a4533b-0033-4f12-8c3c-cc50cfb7cd09",
          "urlToImage": null,
          "publishedAt": "2024-06-10T18:16:07Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Amy Skorheim",
          "title": "Sony's WH-CH720N wireless headphones are down to $98, plus the rest of this week's best tech deals",
          "description": "We're still a ways out from Amazon's upcoming Prime Day sale and most Memorial Day promotions have ended, but this week, we still found a decent amount of discounts on gadgets we've reviewed and recommend. Searches turned up a surprising number of deals on Ap…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_0fcb2b4e-23cf-4159-9db9-6ed94cc5f2bf",
          "urlToImage": null,
          "publishedAt": "2024-06-07T17:30:16Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Cheyenne MacDonald",
          "title": "iPhone users may get AI-generated emoji and more app customization than ever with iOS 18",
          "description": "iOS 18 may inject a little more fun into the iPhone experience. In the Power On newsletter this week, Bloomberg’s Mark Gurman reports that AI-generated emoji will be among the new features Apple shows off at WWDC next month. As if the current emoji library we…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_63da2a66-d374-406c-94c1-0978c6688bd2",
          "urlToImage": null,
          "publishedAt": "2024-05-26T18:12:15Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Chris Welch",
          "title": "Apple’s AirPods are being upgraded with powerful accessibility features",
          "description": "Apple’s AirPods get new Siri gesture controls, and spatial audio for games.",
          "url": "https://www.theverge.com/2024/6/10/24173874/apple-airpods-new-features-wwdc-2024",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/4BSL9awm6HBSkW4yStsrDZFzIE8=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24043027/DSCF9466.jpg",
          "publishedAt": "2024-06-10T17:43:48Z",
          "content": "As it has done in years past, Apple outlined upcoming new software features coming to the company’s current lineup of AirPods earbuds and headphones today.\nYou can soon use your AirPods to control Si… [+718 chars]"
      },
      {
          "source": {
              "id": "wired",
              "name": "Wired"
          },
          "author": "Boone Ashworth",
          "title": "Apple Makes It Easier to Stare at Your Phone in the Car",
          "description": "Plus: Sony Music tries to keep its catalog out of the clutches of AI, there’s a towering new Lord of the Rings Lego set, and Google’s new AI features march onto the web.",
          "url": "https://www.wired.com/story/apple-vehicle-motion-cues/",
          "urlToImage": "https://media.wired.com/photos/6647d1202840f013a58dfcc0/191:100/w_1280,c_limit/iOS-Motion-Features.jpg",
          "publishedAt": "2024-05-18T11:30:00Z",
          "content": "Youve been there, sitting in the passenger seat of a car, trying to focus intently on your phone as a way to ignore all your karaoke-belting seatmates. And then theres a lurch, or a buildup of motion… [+2981 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Maxwell Zeff",
          "title": "Apple CEO Tim Cook on the Magic Mouse: 'Uhhhhhhhhh'",
          "description": "Apple has invented some phenomenal products over the years. Between the iPhone, iPad, Mac, and Macbook Air, it’s pretty hard to choose the best one. After Apple’s 2024 Worldwide Developer Conference, YouTuber Marques Brownlee sat down with CEO Tim Cook to get…",
          "url": "https://gizmodo.com/tim-cook-talks-about-apple-magic-mouse-2024-1851538876",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/809eb618aefe91521e213188d29c1695.png",
          "publishedAt": "2024-06-13T20:35:00Z",
          "content": "Apple has invented some phenomenal products over the years. Between the iPhone, iPad, Mac, and Macbook Air, its pretty hard to choose the best one. After Apples 2024 Worldwide Developer Conference, Y… [+2552 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Germain Lussier",
          "title": "Marvel's Upcoming What If? VR Game Gets a Revealing First Trailer",
          "description": "What if Marvel Studios, Disney+, Industrial Light & Magic, and Apple all came together for a single project? Well, we don’t have to ask “What If?” It’s actually happening. It’s called What If…? – An Immersive Story, it’s a virtual reality experience exclusive…",
          "url": "https://gizmodo.com/what-if-vr-trailer-marvel-studios-apple-vision-pro-ilm-1851492474",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/e931d2a017bf7ba31d70eff4b09a64a0.jpg",
          "publishedAt": "2024-05-22T15:00:00Z",
          "content": "What if Marvel Studios, Disney+, Industrial Light &amp; Magic, and Apple all came together for a single project? Well, we dont have to ask What If? Its actually happening. Its called What If? An Imme… [+1535 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Dua Rashid",
          "title": "WWDC 2024: How to Stream",
          "description": "Apple’s annual Worldwide Developer’s Conference, or WWDC, is all set to be held from June 10 through June 14 at Apple Park in Cupertino, California. If you're not in person, youcan catch up on the Cupertino company’s OS news online. Apple also posts an archiv…",
          "url": "https://gizmodo.com/apple-wwdc-2024-how-to-stream-1851529354",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/e5d8b282a53765755eb484b7e6bd3a8a.jpg",
          "publishedAt": "2024-06-10T14:05:00Z",
          "content": "Apples annual Worldwide Developers Conference, or WWDC, is all set to be held from June 10 through June 14 at Apple Park in Cupertino, California. If you're not in person, you can catch up on the Cup… [+1299 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Valentina Palladino",
          "title": "Memorial Day 2024 tech deals you can still get this weekend - Sales from Apple, Samsung, Anker and more",
          "description": "Memorial Day is here, and along with the holiday has come a swath of tech deals available across the internet. In addition to the typical outdoor gear we see go on sale during this time, a number of our favorite earbuds, tablets, streaming devices and other g…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_729d6863-b738-49c5-94d4-1a37f9f00455",
          "urlToImage": null,
          "publishedAt": "2024-05-27T09:00:36Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Slashdot.org"
          },
          "author": "msmash",
          "title": "Apple Unveils Apple Intelligence",
          "description": "As rumored, Apple today unveiled Apple Intelligence, its long-awaited push into generative artificial intelligence (AI), promising highly personalized experiences built with safety and privacy at its core. The feature, referred to as \"A.I.\", will be integrate…",
          "url": "https://apple.slashdot.org/story/24/06/10/1832242/apple-unveils-apple-intelligence",
          "urlToImage": "https://a.fsdn.com/sd/topics/ai_64.png",
          "publishedAt": "2024-06-10T18:33:00Z",
          "content": "As rumored, Apple today unveiled Apple Intelligence, its long-awaited push into generative artificial intelligence (AI), promising highly personalized experiences built with safety and privacy at its… [+983 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "BBC News"
          },
          "author": null,
          "title": "Apple boosts Siri with ChatGPT in AI overhaul",
          "description": "The company has been slower to roll out generative AI features than rivals including Google and Microsoft.",
          "url": "https://www.bbc.com/news/articles/c4nn5mejl89o",
          "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/1b13/live/1589a5d0-2764-11ef-9d0a-ef8fa1b61375.jpg",
          "publishedAt": "2024-06-10T20:45:55Z",
          "content": "Apple is to boost its Siri voice assistant and operating systems with ChatGPT as it seeks to catch up in the AI race.\r\nThe iPhone maker announced the Siri makeover along with a number of other new fe… [+3282 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Gordon Jackson",
          "title": "Rashida Jones Teams With a Mystery-Solving Robot In Sunny's First Trailer",
          "description": "Apple TV+ has released a trailer for Sunny, its new “ten-episode darkly comedic mystery series” pairing star Rashida Jones with a talking robot. Read more...",
          "url": "https://gizmodo.com/sunny-trailer-apple-a24-rashida-jones-robot-streaming-1851540158",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/5a0f7c5daea761b9b25373b64c8bbade.jpg",
          "publishedAt": "2024-06-14T15:00:00Z",
          "content": "Apple TV+ has released a trailer for Sunny, its new ten-episode darkly comedic mystery series pairing star Rashida Jones with a talking robot. \r\nBased on the novel The Dark Manual by Colin OSullivan,… [+1875 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Florence Ion",
          "title": "What to Expect From Apple’s WWDC 2024",
          "description": "It's almost the end of the developer conference season, and Apple is the last one up to bat. Apple's Worldwide Developer's Conference, or WWDC, is expected to be ripe with announcements for iOS, macOS, iPad OS, and the rest of the software that keeps the wall…",
          "url": "https://gizmodo.com/what-to-expect-from-apple-wwdc-2024-1851527225",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/fbc477bba7b6556279ef3ea515890b87.png",
          "publishedAt": "2024-06-08T10:00:00Z",
          "content": "It's almost the end of the developer conference season, and Apple is the last one up to bat. Apple's Worldwide Developer's Conference, or WWDC, is expected to be ripe with announcements for iOS, macO… [+4643 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Harri Weber",
          "title": "Apple Updates Its Chess App for the First Time Since 2012",
          "description": "As Apple eulogized its commitment to purportedly non-invasive AI during its annual developer conference, the iPhone maker neglected to disclose a critical update that’s coming to the next evolution of its Mac operating system — macOS Sequoia.Read more...",
          "url": "https://gizmodo.com/apple-updates-mac-chess-app-first-time-since-2012-1851542611",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/86a297031e6d16824ec94e4a86dfadf6.jpg",
          "publishedAt": "2024-06-15T20:28:04Z",
          "content": "As Apple eulogized its commitment to purportedly non-invasive AI during its annual developer conference, the iPhone maker neglected to disclose a critical update thats coming to the next evolution of… [+1227 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Kyle Barr",
          "title": "Excited About the Brand New Siri? Here's How Long You'll Have to Wait",
          "description": "If you were hoping that all those“Apple Intelligence” features showcased during WWDC 2024 would make their way to your iPhone sooner rather than later, I’ve got some bad news for you. The best you can expect to see the new and improved Siri is 2025. Plus, you…",
          "url": "https://gizmodo.com/apple-intelligence-siri-2025-iphone-1851532037",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/f39f96e86023acbc231946b42b9455b0.jpg",
          "publishedAt": "2024-06-11T15:15:00Z",
          "content": "If you were hoping that all those Apple Intelligence features showcased during WWDC 2024 would make their way to your iPhone sooner rather than later, Ive got some bad news for you. The best you can … [+3232 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Juli Clover",
          "title": "Apple Shares New Ads Promoting Apple Card",
          "description": "Apple today released a trio of short ads designed to promote the Apple Card, which is Apple's credit card that continues to be limited to the United States.\n\n\n\nThe Sock, Sweater, and Ladder spots all highlight different ‌Apple Card‌ features. Sock focuses on …",
          "url": "https://www.macrumors.com/2024/05/30/apple-shares-new-apple-card-ads/",
          "urlToImage": "https://images.macrumors.com/t/NM6AUrpILC3m4Qde6L8kEpvkMoE=/1600x/article-new/2024/05/apple-card-ad-sweater.jpeg",
          "publishedAt": "2024-05-30T17:40:31Z",
          "content": "Apple today released a trio of short ads designed to promote the Apple Card, which is Apple's credit card that continues to be limited to the United States.\r\nThe Sock, Sweater, and Ladder spots all h… [+763 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Wes Davis",
          "title": "Hands-on with the Surface Laptop on Arm",
          "description": "The 7th edition Surface Laptop comes with Qualcomm’s Snapdragon X Elite Arm chip and is one of the first Copilot Plus PCs, optimized for AI tasks.",
          "url": "https://www.theverge.com/24160789/microsoft-surface-laptop-6-arm-hands-on-snapdragon-x-elite",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/-i4iK1hsCsAVjeWYSZCqZb6tGCM=/0x0:3008x2000/1200x628/filters:focal(1504x1000:1505x1001)/cdn.vox-cdn.com/uploads/chorus_asset/file/25456835/DSC07518.JPG",
          "publishedAt": "2024-05-20T19:09:59Z",
          "content": "Photo: Allison Johnson / The Verge\r\n\n \n\n The Surface Laptop for non-business types is here, and Microsoft hopes that after four years of Apple Silicon, its new Arm-based “AI PC” has a shot at MacBook… [+1745 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Juli Clover",
          "title": "Apple Watch Double Tap Feature Highlighted in Latest Apple Ad",
          "description": "Apple today shared a funny new ad that focuses on the Double Tap feature available on the Apple Watch. In the spot, a man catches a giant fish and while he attempts to wrangle it, he is able to use Double Tap to trigger the Apple Watch to take a photo on a co…",
          "url": "https://www.macrumors.com/2024/06/07/apple-watch-double-tap/",
          "urlToImage": "https://images.macrumors.com/t/ntRvVXN19tlugnIUuTNwoqxKOgQ=/1600x/article-new/2024/06/apple-watch-double-tap.jpeg",
          "publishedAt": "2024-06-07T23:18:34Z",
          "content": "Apple today shared a funny new ad that focuses on the Double Tap feature available on the Apple Watch. In the spot, a man catches a giant fish and while he attempts to wrangle it, he is able to use D… [+733 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Kyle Barr",
          "title": "Apple iOS 18 Will Reportedly Make Siri Less of a Nincompoop",
          "description": "Siri is dumb. It’s a sad fact, but the little assistant has long been a butt of jokes for its propensity to misunderstand even the most simple of requests. As Gizmodo predicted at the start of the year, Siri is getting an AI upgrade that hopefully makes it fa…",
          "url": "https://gizmodo.com/ios-18-siri-smarter-iphone-1851511606",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/9d9cd49a420db68f05267749b666bc0c.jpg",
          "publishedAt": "2024-05-31T14:00:00Z",
          "content": "Siri is dumb. Its a sad fact, but the little assistant has long been a butt of jokes for its propensity to misunderstand even the most simple of requests. As Gizmodo predicted at the start of the yea… [+3013 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Mariella Moon",
          "title": "Adobe threatens to sue Nintendo emulator Delta for its look-alike logo",
          "description": "Delta, an emulator that can play Nintendo games, had to change its logo after Adobe threatened legal action. You'd think it would face trouble from Nintendo, seeing as it has been going after emulators these days, but no. It's Adobe who's going after the deve…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_b4a0735e-a74a-4459-9970-7a3d06225fc4",
          "urlToImage": null,
          "publishedAt": "2024-05-18T12:30:26Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Karissa Bell",
          "title": "Apple's new AI-powered Siri can use apps for you",
          "description": "As expected, Apple’s assistant is about to get much more helpful thanks to a load of new AI-powered capabilities. During WWDC, the company previewed a new version of Siri that can take actions on your behalf and understand a wide range of new queries.\nThe new…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_a320cc2f-c078-43d0-816e-961a4dc66be7",
          "urlToImage": null,
          "publishedAt": "2024-06-10T18:41:16Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Kris Holt",
          "title": "The 10th-gen iPad drops to its lowest price ever",
          "description": "Some fancy new iPads have just hit store shelves and while we reckon the latest iPad Air is the best option for most folks, there’s an entry-level Apple tablet that will check a lot of people’s boxes. And best of all, the 10th-gen iPad is cheaper than ever. T…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_7fccd6ca-29c8-4813-80b7-4b748c36c3ad",
          "urlToImage": null,
          "publishedAt": "2024-05-21T15:10:32Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": "the-verge",
              "name": "The Verge"
          },
          "author": "Umar Shakir",
          "title": "Samsung Galaxy Watch 7 ‘Ultra’ leaks show a supersized squircle for your wrist",
          "description": "Leaked pictures of a Samsung Galaxy Watch 7 Ultra show a squarish design similar to Apple’s Ultra smartwatch and an extra button.",
          "url": "https://www.theverge.com/2024/5/24/24163867/samsung-galaxy-watch7-ultra-leak-square",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/yMGhKpAxIHmPAD6pHzQ-Yx8Z1CM=/0x0:2160x1440/1200x628/filters:focal(1080x720:1081x721)/cdn.vox-cdn.com/uploads/chorus_asset/file/25462906/Image.jpg",
          "publishedAt": "2024-05-24T15:13:14Z",
          "content": "Samsung Galaxy Watch 7 Ultra leaks show a supersized squircle for your wrist\r\nSamsung Galaxy Watch 7 Ultra leaks show a supersized squircle for your wrist\r\n / The leaked pics of this Ultra Samsung Ga… [+1402 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "watchOS 11 Drops Support for These Apple Watch Models",
          "description": "As was rumored, watchOS 11 drops support for the Apple Watch Series 4, Apple Watch Series 5, and first-generation Apple Watch SE, according to Apple's website.\n\n\n\n\n\nThe update is compatible with all other models, including the Apple Watch Series 6 and beyond:…",
          "url": "https://www.macrumors.com/2024/06/10/watchos-11-compatible-apple-watch-models/",
          "urlToImage": "https://images.macrumors.com/t/tFA05a4Qpp9dCSvcDXylDLn54rM=/1600x/article-new/2018/09/apple-watch-series-4-flames.jpg",
          "publishedAt": "2024-06-10T19:41:03Z",
          "content": "As was rumored, watchOS 11 drops support for the Apple Watch Series 4, Apple Watch Series 5, and first-generation Apple Watch SE, according to Apple's website.\r\nThe update is compatible with all othe… [+809 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "'Apple ID' Renamed to 'Apple Account' Across iOS 18 and Other Updates",
          "description": "Earlier this year, we reported that \"Apple ID\" would be renamed to \"Apple Account,\" and this change has now been officially announced.\n\n\n\n\n\nApple confirmed the change in a press release today, with \"Apple Account\" branding now used across iOS 18, iPadOS 18, m…",
          "url": "https://www.macrumors.com/2024/06/11/apple-id-renamed-to-apple-account/",
          "urlToImage": "https://images.macrumors.com/t/7t2t3TLMVz-vrOHPM-rA53zLFOk=/2500x/article-new/2024/06/iOS-18-Apple-Account-Name-Feature-2.5.jpg",
          "publishedAt": "2024-06-11T16:00:07Z",
          "content": "Earlier this year, we reported that \"Apple ID\" would be renamed to \"Apple Account,\" and this change has now been officially announced.\r\nApple confirmed the change in a press release today, with \"Appl… [+714 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "CNET"
          },
          "author": "Lexy Savvides",
          "title": "WatchOS 11 for Apple Watch: New Training Load, Health Features and More - CNET",
          "description": "Apple previewed its next Apple Watch update during WWDC 2024.",
          "url": "https://www.cnet.com/tech/mobile/watchos-11-for-apple-watch-new-training-load-health-features-and-more/",
          "urlToImage": "https://www.cnet.com/a/img/resize/10288bbb01f598f2d23bc3ec471f4d23c6d45c15/hub/2024/06/10/42b264b0-3c3b-4d8b-8154-414e733b970e/screenshot-2024-06-10-at-10-41-57am.png?auto=webp&fit=crop&height=675&width=1200",
          "publishedAt": "2024-06-10T19:50:10Z",
          "content": "Apple's next Apple Watch update, Watch OS 11, is official. The company showcased the new software on Monday during its annual WWDC keynote, held at its Apple Park campus.\r\nApple's software updates ty… [+5057 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "tvOS 18 Compatible With Apple TV HD Released Nearly Nine Years Ago",
          "description": "Here is something that Apple TV HD owners probably didn't expect when they purchased the device all the way back in 2015: it continues to receive software updates.\n\n\n\n\n\nApple's developer website confirms that the tvOS 18 update unveiled today is compatible wi…",
          "url": "https://www.macrumors.com/2024/06/10/tvos-18-compatible-apple-tv-models/",
          "urlToImage": "https://images.macrumors.com/t/yahagDRaUwJedSpmk_nrcNOR2aM=/2500x/article-new/2022/10/apple-tv-4k-yellow-bg-feature.jpg",
          "publishedAt": "2024-06-10T20:08:39Z",
          "content": "Here is something that Apple TV HD owners probably didn't expect when they purchased the device all the way back in 2015: it continues to receive software updates.\r\nApple's developer website confirms… [+767 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Yahoo Entertainment"
          },
          "author": "Cherlynn Low",
          "title": "My favorite iOS 18, iPadOS 18 and watchOS 11 features that flew under the radar at WWDC 2024",
          "description": "There was so much Apple had to cram into its WWDC 2024 keynote that some features were left out of the spotlight. Here at the company's campus, I've had the chance to speak with various executives, as well as get deeper dives into iOS 18, iPadOS 18, Apple Int…",
          "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_1eaa203c-b2f8-4017-a061-aab171f53193",
          "urlToImage": null,
          "publishedAt": "2024-06-12T11:30:44Z",
          "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Kyle Barr",
          "title": "What I Love and What I Can’t Stand About the 2024 iPads",
          "description": "The latest iPads are strange beasts. Beyond the cheaper base iPad, you have the iPad Air and the iPad Pro. They’re both at the top of their game. They’re more powerful than ever, and the more expensive version has processing capabilities nearly equivalent to …",
          "url": "https://gizmodo.com/ipad-pro-air-2024-what-i-love-hate-1851482859",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/38081557798e0b309a361b0e894af64b.jpg",
          "publishedAt": "2024-05-17T10:45:00Z",
          "content": "The latest iPads are strange beasts. Beyond the cheaper base iPad, you have the iPad Air and the iPad Pro. Theyre both at the top of their game. Theyre more powerful than ever, and the more expensive… [+1983 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "Gurman: No Hardware at WWDC, Next Apple TV No Longer Coming Soon",
          "description": "Bloomberg's Mark Gurman does not expect Apple to announce any new hardware during its WWDC 2024 keynote on June 10.\n\n\n\n\n\n\"There's no hardware slated to be announced at WWDC, unless Apple unexpectedly previews a new device launching later (to be clear: I don't…",
          "url": "https://www.macrumors.com/2024/06/02/gurman-no-new-hardware-at-wwdc-2024/",
          "urlToImage": "https://images.macrumors.com/t/yahagDRaUwJedSpmk_nrcNOR2aM=/2500x/article-new/2022/10/apple-tv-4k-yellow-bg-feature.jpg",
          "publishedAt": "2024-06-02T13:59:27Z",
          "content": "Bloomberg's Mark Gurman does not expect Apple to announce any new hardware during its WWDC 2024 keynote on June 10.\r\n\"There's no hardware slated to be announced at WWDC, unless Apple unexpectedly pre… [+1234 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Juli Clover",
          "title": "Apple Weather App Experiencing Issues",
          "description": "The Apple Weather app appears to be experiencing an outage, with some users seeing it fail to load or take 30 seconds or more to update to the current conditions.\n\n\n\n\n\nThere are reports about the Weather app on social media, and we've also confirmed that it i…",
          "url": "https://www.macrumors.com/2024/06/05/weather-app-issues-june/",
          "urlToImage": "https://images.macrumors.com/t/tTiPPN6kJLXTqbTexR84Zx3e0jM=/1920x/article-new/2023/04/weather-off.jpg",
          "publishedAt": "2024-06-05T18:58:05Z",
          "content": "The Apple Weather app appears to be experiencing an outage, with some users seeing it fail to load or take 30 seconds or more to update to the current conditions.\r\nThere are reports about the Weather… [+233 chars]"
      },
      {
          "source": {
              "id": "wired",
              "name": "Wired"
          },
          "author": "Simon Lucas",
          "title": "Sonos Finally Has Headphones and We’re Excited",
          "description": "It’s been a long time coming, but that pair of endlessly anticipated Sonos headphones is now here.",
          "url": "https://www.wired.com/story/sonos-ace-news/",
          "urlToImage": "https://media.wired.com/photos/664baddc54437eb53d45a312/191:100/w_1280,c_limit/Sonos-Ace-Wireless-Headphones-Abstract-Background-SOURCE-Sonos.jpg",
          "publishedAt": "2024-05-21T13:00:00Z",
          "content": "Its true that before the pandemic is a hazy time, an era in which its difficult to pin down chronology with any certainty. So while the rumors of Sonos headphones definitely began before the pandemic… [+2286 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Tim Hardwick",
          "title": "Netflix to End Support for 2nd and 3rd Generation Apple TV",
          "description": "Netflix will no longer support second-generation and third-generation Apple TV models from July 31, 2024, the company has announced in an email to some subscribers.\n\n\n\n\n\nNetflix said that the decision made to \"maintain the best possible Netflix experience\" by…",
          "url": "https://www.macrumors.com/2024/06/04/netflix-end-support-2nd-3rd-gen-apple-tv/",
          "urlToImage": "https://images.macrumors.com/t/AwDsOJMIqj5rXya9oVx0ayfJJfU=/1920x/article-new/2024/06/apple-tv-2nd-gen-2010.jpg",
          "publishedAt": "2024-06-04T11:51:30Z",
          "content": "Netflix will no longer support second-generation and third-generation Apple TV models from July 31, 2024, the company has announced in an email to some subscribers.\r\nNetflix said that the decision ma… [+1098 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Tim Hardwick",
          "title": "Apple to Announce 'Apple Intelligence' Opt-In AI Service at WWDC",
          "description": "Apple will announce its new AI feature set for Apple devices at WWDC on June 10, and Bloomberg's Mark Gurman reports that it will be officially called \"Apple Intelligence.\"\n\n\n\n\n\nThe opt-in AI capabilities will be coming to iOS 18, iPadOS 15, and macOS 15. The…",
          "url": "https://www.macrumors.com/2024/06/07/apple-intelligence-service-wwdc/",
          "urlToImage": "https://images.macrumors.com/t/uT16fDbqseRqBk6g2Vr834gFxXU=/1600x/article-new/2024/03/wwdc-2024-apple-park.jpg",
          "publishedAt": "2024-06-07T11:13:06Z",
          "content": "Apple will announce its new AI feature set for Apple devices at WWDC on June 10, and Bloomberg's Mark Gurmanreports that it will be officially called \"Apple Intelligence.\"\r\nThere also will be a partn… [+858 chars]"
      },
      {
          "source": {
              "id": "ars-technica",
              "name": "Ars Technica"
          },
          "author": "Ars Contributors",
          "title": "A week with the Chevy Blazer EV shows things to love—but also painful flaws",
          "description": "The decision to drop Apple CarPlay was a mistake.",
          "url": "https://arstechnica.com/cars/2024/05/a-week-with-the-chevy-blazer-ev-shows-things-to-love-but-also-painful-flaws/",
          "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2024/05/DSC_8493-760x380.jpg",
          "publishedAt": "2024-05-22T15:12:24Z",
          "content": "Enlarge/ The Chevrolet Blazer was pulled from sale almost immediately after our first drive in December. Now it's back on salewith a price cut.\r\n11\r\nGeneral Motors appears to have solved the problem … [+5097 chars]"
      },
      {
          "source": {
              "id": "ars-technica",
              "name": "Ars Technica"
          },
          "author": "Ashley Belanger",
          "title": "Elon Musk is livid about new OpenAI/Apple deal",
          "description": "Elon Musk attacks Apple/ChatGPT integration as “creepy spyware.”",
          "url": "https://arstechnica.com/tech-policy/2024/06/elon-musk-is-livid-about-new-openai-apple-deal/",
          "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2024/06/GettyImages-2087343447-760x380.jpg",
          "publishedAt": "2024-06-11T20:50:36Z",
          "content": "71\r\nElon Musk is so opposed to Apple's plan to integrate OpenAI's ChatGPT with device operating systems that he's seemingly spreading misconceptions while heavily criticizing the partnership.\r\nOn X (… [+2859 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "tvOS 18 Rumored to Be Compatible With These Apple TV Models",
          "description": "Just ahead of WWDC, we have another last-minute compatibility rumor to share from a proven leaker, with this one relating to the Apple TV.\n\n\n\n\n\nIn a direct message, the leaker told MacRumors contributor Aaron Perris that tvOS 18 should remain compatible with …",
          "url": "https://www.macrumors.com/2024/06/10/tvos-18-compatibility-rumor/",
          "urlToImage": "https://images.macrumors.com/t/yahagDRaUwJedSpmk_nrcNOR2aM=/2500x/article-new/2022/10/apple-tv-4k-yellow-bg-feature.jpg",
          "publishedAt": "2024-06-10T14:04:46Z",
          "content": "Just ahead of WWDC, we have another last-minute compatibility rumor to share from a proven leaker, with this one relating to the Apple TV.\r\nIn a direct message, the leaker told MacRumors contributor … [+857 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Gizmodo.com"
          },
          "author": "Kyle Barr",
          "title": "Microsoft’s All-New ‘Copilot+’ PCs and Surface Pro 2-in-1 Is a Full Court Press Against Apple",
          "description": "Microsoft smells blood in the water, and it seems to be exclusively gunning for Apple’s latest ultra-thin laptops and iPads with devices sporting all-day batteries and ARM-based processors that boast better performance with better energy efficiency. A new Sur…",
          "url": "https://gizmodo.com/microsoft-copilot-surface-apple-ai-1851489235",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/511fa4d08d38c785f28bf2cb31535cd0.jpg",
          "publishedAt": "2024-05-20T21:00:00Z",
          "content": "Microsoft smells blood in the water, and it seems to be exclusively gunning for Apples latest ultra-thin laptops and iPads with devices sporting all-day batteries and ARM-based processors that boast … [+6871 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "Apple Says iPhone 5s Now Obsolete as iPod Touch 6 Becomes 'Vintage'",
          "description": "Apple today made three changes to its vintage and obsolete products list, involving the iPhone 5s, sixth-generation iPod touch, and an older iMac model.\n\n\n\n\n\nFirst, Apple now considers the iPhone 5s to be an \"obsolete\" product worldwide, meaning that Apple St…",
          "url": "https://www.macrumors.com/2024/05/31/apple-says-iphone-5s-now-obsolete/",
          "urlToImage": "https://images.macrumors.com/t/ngkAi3w6nDMDcpgrGD3TE21HlGY=/1600x/article-new/2024/05/iPhone-5s-16x9.jpeg",
          "publishedAt": "2024-05-31T17:30:12Z",
          "content": "Apple today made three changes to its vintage and obsolete products list, involving the iPhone 5s, sixth-generation iPod touch, and an older iMac model.\r\nFirst, Apple now considers the iPhone 5s to b… [+1111 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "iOS 18 Enables You to Use Apple Pay With Chrome and More on Desktop",
          "description": "Apple this week previewed a new system that will allow iPhone users who update to iOS 18 to use Apple Pay in any desktop web browser, such as Chrome, Edge, Firefox, and others. The computer running the browser can even be a Windows PC.\n\n\n\n\n\nAny website that i…",
          "url": "https://www.macrumors.com/2024/06/13/ios-18-apple-pay-in-any-desktop-browser/",
          "urlToImage": "https://images.macrumors.com/t/gmn5tXtywE8aJVKav9YtQZ1-ZXY=/2500x/article-new/2024/06/Apple-Pay-Code-Scan-Feature-1.jpg",
          "publishedAt": "2024-06-13T17:06:35Z",
          "content": "Apple this week previewed a new system that will allow iPhone users who update to iOS 18 to use Apple Pay in any desktop web browser, such as Chrome, Edge, Firefox, and others. The computer running t… [+837 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Hartley Charlton",
          "title": "Apple Introduces Standalone 'Passwords' App",
          "description": "iOS 18, iPadOS 18, and macOS Sequoia feature a new, dedicated Passwords app for faster access to important credentials.\n\n\n\n\n\nThe Passwords app replaces iCloud Keychain, which is currently only accessible via a menu in Settings. Now, passwords are available di…",
          "url": "https://www.macrumors.com/2024/06/10/apple-introduces-standalone-passwords-app/",
          "urlToImage": "https://images.macrumors.com/t/MlSkdvdvZtQGZwUDj57n4h3tJpU=/1960x/article-new/2024/06/macOS-Sequoia-Passwords-app.jpg",
          "publishedAt": "2024-06-10T19:45:20Z",
          "content": "iOS 18, iPadOS 18, and macOS Sequoia feature a new, dedicated Passwords app for faster access to important credentials.\r\nThe Passwords app replaces iCloud Keychain, which is currently only accessible… [+804 chars]"
      },
      {
          "source": {
              "id": "business-insider",
              "name": "Business Insider"
          },
          "author": "Jaures Yip",
          "title": "You're out of luck if you have an older iPhone and want to use Apple Intelligence",
          "description": "Is Apple Intelligence enough of a reason to upgrade your iPhone? Apple certainly hopes so.",
          "url": "https://www.businessinsider.com/apple-intelligence-compatibility-iphone-models-mac-ipad-ios-18-2024-6",
          "urlToImage": "https://i.insider.com/66686075764df16112587ce9?width=1200&format=jpeg",
          "publishedAt": "2024-06-11T15:35:16Z",
          "content": "Apple unveils new Apple Intelligence features at WWDC 2024.Apple\r\n<ul><li>Apple unveiled Apple Intelligence at WWDC 2024.</li><li>An iPhone 15 Pro or newer is required for compatibility with the new … [+2110 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "Worlds Made on iPad: Apple's Latest Ad Showcases Animating With Apple Pencil Pro",
          "description": "Apple today shared a new ad called \"Worlds Made on iPad\" on its YouTube channel. The video features green-screen footage from actress Sofia Wylie overlaid on three different animated backdrops, which Apple says were created by illustrators using the new iPad …",
          "url": "https://www.macrumors.com/2024/05/29/apple-pencil-pro-ad/",
          "urlToImage": "https://images.macrumors.com/t/3BDgEpVjMTJuBARsMJsZwk0lT14=/1600x/article-new/2024/05/Worlds-Made-on-iPad-Apple-Ad.jpeg",
          "publishedAt": "2024-05-29T17:31:39Z",
          "content": "Apple today shared a new ad called \"Worlds Made on iPad\" on its YouTube channel. The video features green-screen footage from actress Sofia Wylie overlaid on three different animated backdrops, which… [+922 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Juli Clover",
          "title": "Spatial Puzzle Game 'Where Cards Fall' Now Available on Apple Vision Pro",
          "description": "Apple is continuing to add to its lineup of Apple Arcade games on the Vision Pro, today adding puzzle game Where Cards Fall.\n\n\n\n\n\nWhere Cards Fall has previously been available on iPhone, iPad, Apple TV, and Mac, and it won an Apple Design Award back in 2020.…",
          "url": "https://www.macrumors.com/2024/05/30/where-cards-fall-vision-pro/",
          "urlToImage": "https://images.macrumors.com/t/KXmmdNKDs8e7kxgZeDZuqRw1wvI=/1600x/article-new/2024/05/where-cards-fall-apple-arcade.jpg",
          "publishedAt": "2024-05-30T20:09:07Z",
          "content": "Apple is continuing to add to its lineup of Apple Arcade games on the Vision Pro, today adding puzzle game Where Cards Fall.\r\nWhere Cards Fall has previously been available on iPhone, iPad, Apple TV,… [+822 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Tim Hardwick",
          "title": "'Apple Intelligence' Generative Personal AI Unveiled for iPhone, iPad, and Mac",
          "description": "Apple at WWDC today announced Apple Intelligence, a deeply integrated, personalized AI experience for Apple devices that uses cutting-edge generative artificial intelligence to enhance user experiences across iPhone, iPad, and Mac.\n\n\n\n\n\nPowered by large-langu…",
          "url": "https://www.macrumors.com/2024/06/10/apple-intelligence-generative-personal-ai-unveiled-for-iphone-ipad-and-mac/",
          "urlToImage": "https://images.macrumors.com/t/pzNqddGiFkZalbNvFlCX69eXoNc=/1600x/article-new/2024/06/apple-intelligence.jpg",
          "publishedAt": "2024-06-10T18:13:06Z",
          "content": "Apple at WWDC today announced Apple Intelligence, a deeply integrated, personalized AI experience for Apple devices that uses cutting-edge generative artificial intelligence to enhance user experienc… [+1348 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "Apple TV App Likely Coming to Android Smartphones, Job Listing Shows",
          "description": "Apple's TV app could be available on Android smartphones and tablets in the future, according to a job listing spotted by Bloomberg's Mark Gurman.\n\n\n\n\n\nApple is seeking a senior Android software engineer to join the Apple TV app team. The engineer would be ta…",
          "url": "https://www.macrumors.com/2024/05/29/apple-tv-app-for-android-job-listing/",
          "urlToImage": "https://images.macrumors.com/t/Fjz_DvS6nVH2hW73HhrujI67xSY=/1600x/article-new/2024/05/Apple-TV-Plus-Black-Banner.jpg",
          "publishedAt": "2024-05-29T20:02:09Z",
          "content": "Apple's TV app could be available on Android smartphones and tablets in the future, according to a job listing spotted by Bloomberg's Mark Gurman.\r\nApple is seeking a senior Android software engineer… [+1183 chars]"
      },
      {
          "source": {
              "id": "ars-technica",
              "name": "Ars Technica"
          },
          "author": "Benj Edwards",
          "title": "Report: Apple isn’t paying OpenAI for ChatGPT integration into OSes",
          "description": "Apple thinks pushing OpenAI’s brand to hundreds of millions is worth more than money.",
          "url": "https://arstechnica.com/information-technology/2024/06/report-apple-isnt-paying-openai-for-chatgpt-integration-into-oses/",
          "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2024/06/openai_apple_1_hero-760x380.jpg",
          "publishedAt": "2024-06-13T17:20:42Z",
          "content": "80\r\nOn Monday, Apple announced it would be integrating OpenAI's ChatGPT AI assistant into upcoming versions of its iPhone, iPad, and Mac operating systems. It paves the way for future third-party AI … [+3829 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Juli Clover",
          "title": "Apple Updates Developer Forums Ahead of WWDC, Provides Insights Into Available Developer Tools",
          "description": "As the countdown to WWDC 2024 continues, Apple today highlighted the tools and programs that it makes available to developers, and announced an update to the Apple Developer Forums.\n\n\n\n\n\nApple says that the updated forums will connect developers with more exp…",
          "url": "https://www.macrumors.com/2024/06/07/apple-developer-tools-insights/",
          "urlToImage": "https://images.macrumors.com/t/j20uqsnzhIxyU6h1nsWwdS2s0e8=/2250x/article-new/2021/04/apple-developer-app-feature.jpg",
          "publishedAt": "2024-06-07T13:00:00Z",
          "content": "As the countdown to WWDC 2024 continues, Apple today highlighted the tools and programs that it makes available to developers, and announced an update to the Apple Developer Forums.\r\nApple says that … [+2194 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Juli Clover",
          "title": "Netflix Testing Major Apple TV App Redesign",
          "description": "Netflix is testing a redesigned version of its TV app, reports The Verge, marking the first major overhaul to the app in the last decade. The new design is a notable departure from the current look, but it is more modern and puts more information about conten…",
          "url": "https://www.macrumors.com/2024/06/06/netflix-tv-app-redesign/",
          "urlToImage": "https://images.macrumors.com/t/VW3C3pYnwQj7fzFdKQHLRXN2_zE=/1600x/article-new/2024/06/netflix-app-update.jpg",
          "publishedAt": "2024-06-06T22:34:00Z",
          "content": "Netflix is testing a redesigned version of its TV app, reports The Verge, marking the first major overhaul to the app in the last decade. The new design is a notable departure from the current look, … [+1587 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Juli Clover",
          "title": "Apple Now Selling Refurbished iPhone 14 Models",
          "description": "Apple today added refurbished iPhone 14, ‌iPhone 14‌ Plus, ‌iPhone 14‌ Pro, and ‌iPhone 14‌ Pro Max devices to its online store for refurbished products, offering the prior-generation iPhones at a discount for the first time since their 2022 launch.\n\n\n\n\n\nThe …",
          "url": "https://www.macrumors.com/2024/05/24/apple-now-selling-refurbished-iphone-14-models/",
          "urlToImage": "https://images.macrumors.com/t/AfUJjziVZqBKZaug47mpFVG9mGA=/2500x/article-new/2023/03/Apple-iPhone-14-color-lineup-feature.jpg",
          "publishedAt": "2024-05-24T18:15:56Z",
          "content": "Apple today added refurbished iPhone 14, ‌iPhone 14‌ Plus, ‌iPhone 14‌ Pro, and ‌iPhone 14‌ Pro Max devices to its online store for refurbished products, offering the prior-generation iPhones at a di… [+1536 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "Here's What's New in Apple Wallet on iOS 18 for Event Tickets and More",
          "description": "iOS 18 includes a handful of enhancements to the Wallet app on the iPhone, with new features for Apple Pay, Apple Cash, event tickets, and more.\n\n\n\n\n\nBelow, we outline everything new for the Wallet app on iOS 18, based on information from Apple's press releas…",
          "url": "https://www.macrumors.com/2024/06/14/whats-new-in-apple-wallet-on-ios-18/",
          "urlToImage": "https://images.macrumors.com/t/o6VXQhKV-40prCXSTzx_eqI6-vk=/2500x/article-new/2024/06/iOS-18-Wallet-Feature.jpg",
          "publishedAt": "2024-06-14T14:32:29Z",
          "content": "iOS 18 includes a handful of enhancements to the Wallet app on the iPhone, with new features for Apple Pay, Apple Cash, event tickets, and more.\r\nBelow, we outline everything new for the Wallet app o… [+2699 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "Apple Shares WWDC 2024 Playlist With One Hour of 'Summer Sounds'",
          "description": "Excited for WWDC 2024? Get in the mood with the official Apple Music playlist for the event, which features 20 songs from a variety of artists, including Billie Eilish, Sabrina Carpenter, Tommy Richman, Dominic Fike, and others.\n\n\n\n\n\n\"Check out this playlist …",
          "url": "https://www.macrumors.com/2024/05/29/apple-shares-wwdc-2024-playlist/",
          "urlToImage": "https://images.macrumors.com/t/9D1byeeTZGkW6Qm9465GsNUjtp8=/2500x/article-new/2024/03/wwdc-2024-main-image-feature.jpg",
          "publishedAt": "2024-05-29T17:44:39Z",
          "content": "Excited for WWDC 2024? Get in the mood with the official Apple Music playlist for the event, which features 20 songs from a variety of artists, including Billie Eilish, Sabrina Carpenter, Tommy Richm… [+730 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "MacRumors"
          },
          "author": "Joe Rossignol",
          "title": "Apple Launching Vision Pro in These 8 Countries by Mid-July",
          "description": "Apple today announced that the Vision Pro headset will be available in eight additional countries over the coming weeks.\n\n\n\n\n\nThe headset is launching in China, Japan, and Singapore on June 28, followed by Australia, Canada, France, Germany, and the UK on Jul…",
          "url": "https://www.macrumors.com/2024/06/10/vision-pro-launching-in-more-countries/",
          "urlToImage": "https://images.macrumors.com/t/Tf-nRmBQaXs5jl1CpQCJ_dVREko=/1600x/article-new/2024/06/Vision-Pro-International.jpeg",
          "publishedAt": "2024-06-10T17:26:33Z",
          "content": "Apple today announced that the Vision Pro headset will be available in eight additional countries over the coming weeks.\r\nThe headset is launching in China, Japan, and Singapore on June 28, followed … [+60 chars]"
      }
  ],
  "1970-04-18T12:00+05:30[Asia/Kolkata]": [
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      },
      {
          "source": {
              "id": null,
              "name": "[Removed]"
          },
          "author": null,
          "title": "[Removed]",
          "description": "[Removed]",
          "url": "https://removed.com",
          "urlToImage": null,
          "publishedAt": "1970-01-01T00:00:00Z",
          "content": "[Removed]"
      }
  ]
};
return (
    <div>
        <h1>News Search App</h1>
        <SearchBar onSearch={handleSearch} />
        {/* <NewsList articles={articles} /> */}
        <NewsList articles={sampleArticle} />
    </div>
);
};

export default App;