USE ch12db;

SELECT * FROM emp a
INNER JOIN emp b ON a.manager_id = b.id;