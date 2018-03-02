<?php
if(isset($_POST['submitlogin']))
{
    $name = isset($_POST['name']) ? $_POST['name'] : '' ;
    $output = [
            'name' => $name
    ];
header("Content-type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *.ampproject.org");
header("AMP-Access-Control-Allow-Source-Origin: https://www.domain.com");
header("Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin");

echo json_encode($output);
die();

}
?>
<!doctype html>
<html amp>
<head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="canonical" href="https://www.domain.com/test.php"/>
    <title>AMP form</title>
</head>
<body>

<form method="post" action-xhr="#" target="_top">
    Name:<input type="text" name="name" />
    <input type="submit" name="submitlogin" value="Submit" />
</form>
<div submit-success>
    <template type="amp-mustache">
        Success! Thanks for trying the
        <code>amp-form</code> demo! The name submited was {{name}}
    </template>
</div>
</body>
</html>