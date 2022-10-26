USE ch12db;

SELECT a.first_name, a.last_name, a.role_id, b.first_name AS manager_first, b.last_name AS manager_last FROM emp a
INNER JOIN emp b ON a.manager_id = b.id;