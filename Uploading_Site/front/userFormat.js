const fs = require('fs');
const path = require('path');

const HTML = (userName) => {
  const directoryPath = path.join(__dirname, `../users/${userName}`);

  if(fs.existsSync(directoryPath)) {
    let userInfo = fs.readFileSync(`${directoryPath}/info.txt`);
    
    return `
    <html>
      <head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>
			Alpha Glasses
		</title>
		<link rel="icon" href="../home/images/Alpha_Black.png" type="image/x-icon" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" />
		<link href="../default.css" rel="stylesheet" type="text/css" media="all" />
		<link href="../fonts.css" rel="stylesheet" type="text/css" media="all" />
      </head>
      <body>
        <div id="header-wrapper">
			    <div id="header" class="container">
				    <div id="logo">
					    <h1><a href="/index.html">Alpha Glasses</a></h1>
					    <span>Hidden page <a href="/hidden.html" rel="nofollow">Alpha</a></span>
				    </div>
				    <div id="menu">
				  	  <ul>
				  		  <li><a href="/index.html" accesskey="1" title="">Homepage</a></li>
				  		  <li><a href="/about.html" accesskey="3" title="">About Us</a></li>
				  		  <li><a href="../user/list" accesskey="2" title=""><strong>Upload Files</strong></a></li>
				  		  <li><a href="/how.html" accesskey="4" title="">How to Use</a></li>
				  		  <li><a href="#contact" accesskey="5" title="">Contact Us</a></li>
				  	  </ul>
				    </div>
			    </div>
		    </div>
		    <div id="wrapper1">
  			  <div id="welcome" class="container">
  			  	<div class="title">
  			  		<h2>정보 입력 및 수정</h2>
  			  	</div>
			<p style="font-size: 24px; text-align: center;">
			  이곳에서는 대상에 대한 사진 추가, 정보 수정을 하실 수 있습니다.<br>
			  사진은 파일 선택을 이용해서 추가해주시고, 정보는 직접 입력하서셔 수정하실 수 있습니다.
					</p>
					
				    <form action="../api/user/${userName}/upload" method="post" enctype="multipart/form-data">
				    	<input type="file" name="profile" multiple="multiple">
				    	<input type="submit">
				    </form>
				    <form action="../api/user/${userName}/info" method="post">
				  	  <textarea name="info" id="" cols="30" rows="10">${userInfo}</textarea>
					    <input type="submit">
				    </form>

			    </div>
		    </div>
		    <div id="wrapper4">
			    <div id="footer" class="container">
			  	  <div>
			  		  <header class="title">
			  			  <h2 id="contact">Contact Us</h2>
                <span class="byline">Contact to direct Alpha's social account if you want to have conversation with him.</span> 
              </header>
			  		  <ul class="contact">
			  			  <li><a href="https://www.instagram.com/0____alpha____0/" class="icon icon-instagram"><span>Instagram</span></a></li>
			  			  <li><a href="https://www.facebook.com/Alpha-754036214939107" class="icon icon-facebook"><span>Facebook</span></a></li>
			  			  <li><a href="https://github.com/Alpha-Dvlp" class="icon icon-github"><span>GitHub</span></a></li>
			  		  </ul>
				    </div>
			    </div>
		    </div>
      </body>
    </html>
    `;
  } else {
    return `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        Nothing here;
      </body>
    </html>      
    `;
  }
}

module.exports = {
  HTML
}