<?php

header("Content-Type: application/json");
require_once "../config/connectdb.php";

function getNextId($pdo, $table)
{

    $stmt = $pdo->query("
SELECT MIN(t1.id + 1) AS next_id
FROM $table t1
LEFT JOIN $table t2
ON t1.id + 1 = t2.id
WHERE t2.id IS NULL
");

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row['next_id']) {
        return 1;
    }

    return $row['next_id'];
}

try {

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        case "GET":

            $stmt = $myPDO->query("
SELECT *
FROM game_genres
ORDER BY id
");

            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

            break;


        /* CREATE */

        case "POST":

            $data = json_decode(file_get_contents("php://input"), true);

            $newId = getNextId($myPDO, "game_genres");

            $stmt = $myPDO->prepare("
INSERT INTO game_genres
(id,genre_name)
VALUES (?,?)
");

            $stmt->execute([
                $newId,
                $data['genre_name']
            ]);

            echo json_encode([
                "success" => true,
                "id" => $newId
            ]);

            break;


        /* UPDATE */

        case "PUT":

            $data = json_decode(file_get_contents("php://input"), true);

            $stmt = $myPDO->prepare("
UPDATE game_genres
SET genre_name=?
WHERE id=?
");

            $stmt->execute([
                $data['genre_name'],
                $data['id']
            ]);

            echo json_encode(["success" => true]);

            break;


        /* DELETE */

        case "DELETE":

            $data = json_decode(file_get_contents("php://input"), true);

            $stmt = $myPDO->prepare("
DELETE FROM game_genres
WHERE id=?
");

            $stmt->execute([$data['id']]);

            echo json_encode(["success" => true]);

            break;
    }
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode(["error" => "Server error"]);
}
