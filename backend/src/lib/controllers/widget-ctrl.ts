import { Request, Response } from "express";
import WidgetFactory from "../factories/widget-factory";
import WidgetRepository from "../repositories/widget-repo";
import DashboardRepository from "../repositories/dashboard-repo";

async function getWidgetById(req: Request, res: Response) {
  const { id, widgetId } = req.params;

  if (!id) {
    res.status(400).send("Missing required field `id`");
    return;
  }

  if (!widgetId) {
    res.status(400).send("Missing required field `widgetId`");
    return;
  }

  const repo = WidgetRepository.getInstance();
  const widget = await repo.getWidgetById(id, widgetId);
  res.json(widget);
}

async function createWidget(req: Request, res: Response) {
  const user = req.user;
  const dashboardId = req.params.id;
  if (!dashboardId) {
    res.status(400).send("Missing required field `id`");
    return;
  }

  const { name, content, widgetType, showTitle } = req.body;

  if (!name) {
    res.status(400).send("Missing required field `name`");
    return;
  }

  if (!content) {
    res.status(400).send("Missing required field `content`");
    return;
  }

  if (!widgetType) {
    res.status(400).send("Missing required field `widgetType`");
    return;
  }

  let widget;
  try {
    widget = WidgetFactory.createWidget({
      name,
      dashboardId,
      widgetType,
      showTitle,
      content,
    });
  } catch (err) {
    console.log("Invalid request to create widget", err);
    return res.status(400).send(err.message);
  }

  const repo = WidgetRepository.getInstance();
  const dashboardRepo = DashboardRepository.getInstance();

  await repo.saveWidget(widget);
  await dashboardRepo.updateAt(dashboardId, user);

  return res.json(widget);
}

async function updateWidget(req: Request, res: Response) {
  const user = req.user;
  const dashboardId = req.params.id;
  if (!dashboardId) {
    res.status(400).send("Missing required field `id`");
    return;
  }

  const widgetId = req.params.widgetId;
  if (!widgetId) {
    res.status(400).send("Missing required field `widgetId`");
    return;
  }

  const { name, content, updatedAt, showTitle } = req.body;

  if (!name) {
    res.status(400).send("Missing required field `name`");
    return;
  }

  if (!content) {
    res.status(400).send("Missing required field `content`");
    return;
  }

  if (!updatedAt) {
    res.status(400).send("Missing required field `updatedAt`");
    return;
  }

  const repo = WidgetRepository.getInstance();
  const dashboardRepo = DashboardRepository.getInstance();
  await repo.updateWidget({
    dashboardId,
    widgetId,
    name,
    content,
    lastUpdatedAt: new Date(updatedAt),
    showTitle,
  });
  await dashboardRepo.updateAt(dashboardId, user);
  return res.send();
}

async function deleteWidget(req: Request, res: Response) {
  const dashboardId = req.params.id;
  const widgetId = req.params.widgetId;

  if (!dashboardId) {
    res.status(400);
    return res.send("Missing required path param `id`");
  }

  if (!widgetId) {
    res.status(400);
    return res.send("Missing required path param `widgetId`");
  }

  const repo = WidgetRepository.getInstance();
  await repo.deleteWidget(dashboardId, widgetId);
  return res.send();
}

async function setWidgetOrder(req: Request, res: Response) {
  const user = req.user;
  const dashboardId = req.params.id;
  const { widgets } = req.body;

  if (!dashboardId) {
    res.status(400);
    return res.send("Missing required path param `id`");
  }

  if (!widgets) {
    res.status(400);
    return res.send("Missing required field `widgets`");
  }

  const repo = WidgetRepository.getInstance();
  const dashboardRepo = DashboardRepository.getInstance();

  try {
    await repo.setWidgetOrder(dashboardId, widgets);
    await dashboardRepo.updateAt(dashboardId, user);
  } catch (err) {
    console.log("Failed to set widget order", err);
    res.status(409);
    return res.send("Unable to reorder widgets, please refetch them and retry");
  }

  return res.send();
}

export default {
  getWidgetById,
  createWidget,
  updateWidget,
  deleteWidget,
  setWidgetOrder,
};
