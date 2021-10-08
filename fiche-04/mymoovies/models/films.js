"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/films.json";

// Default items
const defaultItems = [];

class Films {
  constructor(dbPath = jsonDbPath, items = defaultItems) {
    this.jsonDbPath = dbPath;
    this.collection = items;
  }

  getNextId() {
    const collection = parse(this.jsonDbPath, this.collection);
    let nextId;
    if (collection.length === 0) nextId = 1;
    else nextId = collection[collection.length - 1].id + 1;

    return nextId;
  }

  /**
   * Returns all resources
   * @param {predicate} function to be used to filter all resources
   * @returns {Array} Array of resources
   */
  getAll(filterPredicate) {
    let collection;
    collection = parse(this.jsonDbPath, this.collection);

    if (filterPredicate) return collection.filter(filterPredicate);
    else return collection;
  }

  /**
   * Returns the resource identified by id
   * @param {number} id - id of the resource to find
   * @returns {object} the resource found or undefined if the id does not lead to a resource
   */
  getOne(id) {
    const collection = parse(this.jsonDbPath, this.collection);
    const foundIndex = collection.findIndex((item) => item.id == id);
    if (foundIndex < 0) return;

    return collection[foundIndex];
  }

  /**
   * Add a resource in the DB and returns the added resource (containing a new id)
   * @param {object} body - it contains all required data to create a ressource
   * @returns {object} the resource that was created (with id)
   */

  addOne(body) {
    const collection = parse(this.jsonDbPath, this.collection);

    // add new resource
    const newResource = {
      id: this.getNextId(),
      ...body, // shallow copy with the spread operator
    };

    collection.push(newResource);
    serialize(this.jsonDbPath, collection);
    return newResource;
  }

  /**
   * Delete a resource in the DB and return the deleted resource
   * @param {number} id - id of the resource to be deleted
   * @returns {object} the resource that was deleted or undefined if the delete operation failed
   */
  deleteOne(id) {
    const collection = parse(this.jsonDbPath, this.collection);
    const foundIndex = collection.findIndex((item) => item.id == id);
    if (foundIndex < 0) return;
    const itemRemoved = collection.splice(foundIndex, 1);
    serialize(this.jsonDbPath, collection);

    return itemRemoved[0];
  }

  /**
   * Update a resource in the DB and return the updated resource
   * @param {number} id - id of the resource to be updated
   * @param {object} body - it contains all the data to be updated
   * @returns {object} the updated resource or undefined if the update operation failed
   */
  updateOne(id, body) {
    const collection = parse(this.jsonDbPath, this.collection);
    const foundIndex = collection.findIndex((item) => item.id == id);
    if (foundIndex < 0) return;
    // create a new object based on the existing resource - prior to modification -
    // and the properties requested to be updated (those in the body of the request)
    // use of the spread operator to create a shallow copy and repl
    const updatedResource = { ...collection[foundIndex], ...body };
    // replace the resource found at index : (or use splice)
    collection[foundIndex] = updatedResource;

    serialize(this.jsonDbPath, collection);
    return updatedResource;
  }
}

module.exports = { Films };
