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

        /* =========================
   READ
========================= */

        case "GET":

            if (isset($_GET['genres'])) {

                $stmt = $myPDO->query("
            SELECT id, genre_name
            FROM game_genres
            ORDER BY genre_name
        ");

                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                break;
            }

            $stmt = $myPDO->query("
        SELECT g.id, g.name, g.developer,
               gg.genre_name,
               gg.id as genre_id
        FROM personal_games g
        LEFT JOIN game_genres gg
        ON g.genre_id = gg.id
        ORDER BY g.id
    ");

            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

            break;


        /* =========================
   CREATE
========================= */

        case "POST":

            $data = json_decode(file_get_contents("php://input"), true);

            $newId = getNextId($myPDO, "personal_games");

            $stmt = $myPDO->prepare("
        INSERT INTO personal_games
        (id, name, developer, genre_id)
        VALUES (?,?,?,?)
    ");

            $stmt->execute([
                $newId,
                $data['name'],
                $data['developer'],
                $data['genre_id']
            ]);

            echo json_encode([
                "success" => true,
                "id" => $newId
            ]);

            break;


        /* =========================
   UPDATE
========================= */

        case "PUT":

            $data = json_decode(file_get_contents("php://input"), true);

            $stmt = $myPDO->prepare("
        UPDATE personal_games
        SET name=?,
            developer=?,
            genre_id=?
        WHERE id=?
    ");

            $stmt->execute([
                $data['name'],
                $data['developer'],
                $data['genre_id'],
                $data['id']
            ]);

            echo json_encode(["success" => true]);

            break;


        /* =========================
   DELETE
========================= */

        case "DELETE":

            $data = json_decode(file_get_contents("php://input"), true);

            $stmt = $myPDO->prepare("
        DELETE FROM personal_games
        WHERE id=?
    ");

            $stmt->execute([$data['id']]);

            echo json_encode(["success" => true]);

            break;
    }
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode([
        "error" => "Server error"
    ]);
}
