import express from "express";
import itemsController from "../controllers/items.controller";

const router = express.Router();

router.get("/get", (req, res) => {
  try {
    const result = itemsController.GetItems((error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      console.log('at call' + result);
      return res.json(results[0]);
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    console.log('At routes' + req.params.id)
    if (req.params.id) {
      const result = itemsController.DeleteItem(req.params.id, (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
        console.log('at call' + result);
        return res.json(results[0]);
      });
    }
    else { res.status(400).json({ error: "Bad Request" }); }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post("/add", (req, res) => {
  try {
    console.log('At call' + JSON.stringify(req.body))
    const result = itemsController.AddItem(req.body, (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
      }

      console.log(results[0])
      return res.json(result);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/getDate", async (req, res) => {
  try {
    const result = await itemsController.GetDate();
    console.log(result);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

export default router;
