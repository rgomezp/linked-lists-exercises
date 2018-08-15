"use strict";

describe('Linked Lists Poop', () => {
  let dll;

  beforeEach(() => {
    dll = new LinkedList();
  });

  let toArray = l => {
    let array = [];
    let temp = l.head;
    while (temp) {
      //console.log(temp.data);
      array.push(temp.data);
      temp = temp.next;
    }

    return array;
  };

  let toArrayReverse = l => {
    let array = [];
    let temp = l.tail;
    while (temp) {
      array.push(temp.data);
      temp = temp.prev;
    }

    return array;
  };

  describe('Linked List Basics', () => {
    it('is empty when created', () => {
      expect(toArray(dll).length).toBe(0);
      expect(toArrayReverse(dll).length).toBe(0);
    });
  });

  // Adds a new node containing value to the front of llist
  // time: O(1)
  // insertFront(value) {};
  describe('insertFront()', () => {
    it('contains the number of items added', () => {
      dll.insertFront(1);
      dll.insertFront(1);
      expect(toArray(dll).length).toBe(2);
      expect(toArrayReverse(dll).length).toBe(2);
    });

    it('adds a new node containing value to the front', () => {
      dll.insertFront(10);
      expect(toArray(dll)).toEqual([10]);
      expect(toArrayReverse(dll)).toEqual([10]);
    });

    it('maintains the right order', () => {
      dll.insertFront(1);
      dll.insertFront(2);
      dll.insertFront(3);
      expect(toArray(dll)).toEqual([3, 2, 1]);
      expect(toArrayReverse(dll)).toEqual([1, 2, 3]);
    });
  });

  // Adds a new node containing value to the back of llist
  // time: O(n), where n is the length of llist
  // insertBack(value) { }
  describe('insertBack()', () => {
    it('contains the number of items added', () => {
      dll.insertBack(1);
      dll.insertBack(1);
      expect(toArray(dll).length).toBe(2);
      expect(toArrayReverse(dll).length).toBe(2);
    });

    it('adds a new node containing value to the back', () => {
      dll.insertBack(10);
      expect(toArray(dll)).toEqual([10]);
      expect(toArrayReverse(dll)).toEqual([10]);
    });

    it('maintains the right order', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      expect(toArray(dll)).toEqual([1, 2, 3]);
      expect(toArrayReverse(dll)).toEqual([3, 2, 1]);
    });
  });

  describe('insertFront() & insertBack()', ()=>{
      it('correct order', ()=>{
        dll.insertBack(3);
        dll.insertFront(5);
        dll.insertFront(2);
        dll.insertBack(7);
        expect(toArray(dll)).toEqual([2,5,3,7]);
      })
  });

  describe('reverse()', ()=>{
      it('correct order', ()=>{
        dll.insertBack(3);
        dll.insertFront(5);
        dll.insertFront(2);
        dll.insertBack(7);
        dll.reverse();
        expect(toArray(dll)).toEqual([7,3,5,2]);
      })
  });

  describe('reverseNth(n)', ()=>{
      it('correct order with listSize % n != 0', ()=>{
          var list = dll;
          list.insertFront(7);
	        list.insertFront(6);
	        list.insertFront(5);
          list.insertFront(4);
          list.insertFront(3);
          list.insertFront(2);
  	      list.insertFront(1);
          list.reverseNth(3);
        expect(toArray(list)).toEqual([3,2,1,6,5,4,7]);
      });
      it('correct order with listSize % n == 0', ()=>{
          var list = dll;
	        list.insertFront(6);
	        list.insertFront(5);
          list.insertFront(4);
          list.insertFront(3);
          list.insertFront(2);
  	      list.insertFront(1);
          list.reverseNth(3);
        expect(toArray(list)).toEqual([3,2,1,6,5,4]);
      });
  });

  describe('splitHelper()', ()=>{
      it('checks second half', ()=>{
          var list = dll;
          list.insertFront(7);
	        list.insertFront(6);
	        list.insertFront(5);
          list.insertFront(4);
          list.insertFront(3);
          list.insertFront(2);
  	      list.insertFront(1);
          list.head = list.splitHelper(list.head, 3);
          //list.printList();
        expect(toArray(list)).toEqual([4,5,6,7]);
      });
      it('checks first half: uses reverse()', ()=>{
          var list = dll;
          list.insertFront(7);
	        list.insertFront(6);
	        list.insertFront(5);
          list.insertFront(4);
          list.insertFront(3);
          list.insertFront(2);
  	      list.insertFront(1);
          list.splitHelper(list.head, 3);
          list.reverse();
        expect(toArray(list)).toEqual([3,2,1]);
      });
  });
  describe("merge()", ()=>{
    /*
    * For testing, make sure your function uses node.data instead of node.data.idx, then change it back for image test
    */
    it("checks order (perfectly interleaved)", ()=>{
      var list1 = new LinkedList();
      list1.insertFront(7);
      list1.insertFront(4);
      list1.insertFront(0);

      var list2 = new LinkedList();
      list2.insertFront(6);
      list2.insertFront(3);
      list2.insertFront(2);

      var merged = new LinkedList();
      merged.head = list1.merge(list1.head, list2.head);
      //merged.printList();

      expect(toArray(merged)).toEqual([0,2,3,4,6,7]);
    });

    it("checks order (separated)", ()=>{
      var list1 = new LinkedList();
      list1.insertFront(3);
      list1.insertFront(2);
      list1.insertFront(0);

      var list2 = new LinkedList();
      list2.insertFront(6);
      list2.insertFront(5);
      list2.insertFront(4);

      var merged = new LinkedList();
      merged.head = list1.merge(list1.head, list2.head);
      //merged.printList();

      expect(toArray(merged)).toEqual([0,2,3,4,5,6]);
    });

    it("checks order (imperfectly interleaved)", ()=>{
      var list1 = new LinkedList();
      list1.insertFront(5);
      list1.insertFront(2);
      list1.insertFront(0);

      var list2 = new LinkedList();
      list2.insertFront(4);
      list2.insertFront(3);
      list2.insertFront(1);

      var merged = new LinkedList();
      merged.head = list1.merge(list1.head, list2.head);
      //merged.printList();

      expect(toArray(merged)).toEqual([0,1,2,3,4,5]);
    });

    it("checks order (only two elements)", ()=>{
      var list1 = new LinkedList();
      list1.insertFront(5);

      var list2 = new LinkedList();

      list2.insertFront(1);

      var merged = new LinkedList();
      merged.head = list1.merge(list1.head, list2.head);
      merged.printList();

      expect(toArray(merged)).toEqual([1,5]);
    });
  });

});
