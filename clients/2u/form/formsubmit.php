<?php
echo "Php works";
echo $_POST['name']
if(isset($_POST['submitform']))
{
    $name = isset($_POST['name']) ? $_POST['name'] : '' ;
    $output = [
            'name' => $name
    ];
}
header("Content-type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *.ampproject.org");
header("AMP-Access-Control-Allow-Source-Origin: https://www.domain.com");
header("Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin");
echo $_POST['name']
echo json_encode($output);
die();

?>