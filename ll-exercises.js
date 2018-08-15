"use strict";

// we will be working with doubly linked lists
class ListNode {
  constructor(data) {
    this.data = data;

    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
  * insertFront() -- Insertion Function
  *
  * Inserts a node with the parameter value into the list at the front.
  * This function SHOULD create a new ListNode.
  */
  insertFront(value) {
    var newNode = new ListNode(value);
    if(this.length!=0){
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }else{
      this.head = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /**
  * insertBack() -- Insertion Function
  *
  * Inserts a node with the parameter value into the list at the back.
  * This function SHOULD create a new ListNode.
  */
  insertBack(value) {
    var newNode = new ListNode(value);
    if(this.length!=0){
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }else{
      this.head = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  /**
  * reverseHelper() -- Reversal Helper
  *
  * Reverses the provided sequence of nodes, starting at `start`,
  * and ending at `tail`. The provided sequence may be a partial
  * list (a sequence of nodes inside a list), so try to handle
  * updating start.prev and end.next as well.
  *
  * @param start the first ListNode in the sequence
  * @param end the last ListNode in the sequence
  */
  reverseHelper(start, end) {
    var temp = start;
    while(temp!=end){
      var switcher = temp.next;
      temp.next = temp.prev;
      temp.prev = switcher;
      temp = switcher;
    }
    if(temp==end){
      temp.next = temp.prev;
      temp.prev = null;
    }
    this.head = end;
    this.tail = start;
  }

  printList(){
    var temp = this.head;
    while(temp!=null){
      console.log(temp.data);
      temp = temp.next;
    }
  }

  /*


      var list = new LinkedList()
      list.insertFront(2);
      list.insertFront(3);
      list.insertFront(5);

    5{
      next: 2
      prev: null
    }

    2{
      next: 3
      prev: 5
    }

     h              t
    [5]<->[2]<->[3]<->[7]
    [7]<->[3]<->[2]<->[5]
  */

  /**
  * reverse() -- Reversal Function
  *
  * Reverses the current list.
  */
  reverse() {
    this.reverseHelper(this.head, this.tail);
  }

  /**
  * reverseNth() -- Block Reversal Function
  *
  * Reverses the current list in blocks of the given size.
  * You should use your reverse() helper function in this method.
  *
  * @param n Size of the blocks to be reversing.
  * trueHead :
      should be the head of list by completion
  * trueTail :
      should be the tail of list by completion
  * iter :
      used to iterate through the list
  * start:
      used to track where the reverse should start
  * lastTail:
      used to track the tail of the previous segment to connect that node to the head of the new segment
  * first:
      used to set the trueHead (first node resulting from first reversal)
  * newStart:
      used to track the starting node of the next segment
  */
  reverseNth(n) {
      var trueHead;
      var iter;
      var start;
      var trueTail = this.tail;;
      var isDivisible;
      var newStart;
      var count=0;
      var lastTail = null;
      var first = true;
      iter = start = this.head;

      while(iter!=null){
        count++;
        if(count%n==0){         // ! is divisible !
          newStart = iter.next;
          this.reverseHelper(start, iter);

          if(first){
            trueHead = this.head;
            first = false;
          }

          this.head.prev = lastTail;
          if(this.head.prev !== null) this.head.prev.next = this.head;
          lastTail = this.tail;
          start = newStart;
          iter = start;
          isDivisible = true;
        }else{
          iter=iter.next;
          isDivisible = false;
        }
      }

      if(!isDivisible){
        start.prev = lastTail;
        lastTail.next = start;
        this.tail = trueTail;
      }else{
        this.tail = lastTail;
        this.tail.next = null;
      }

      // reset head
      this.head = trueHead;

  }

  /**
  * waterfall() -- List Reordering Function
  *
  * Reorders the current list using the waterfall algorithm.
  */
  waterfall() {
    var count = 0;
    var iter = this.head;
    while(iter!=this.tail){
      count++;
      if(count%2==0){     // move to back!
        var temp = iter.next; // next node over
        iter.prev.next = temp;
        temp.prev = iter.prev;
        this.tail.next = iter;
        iter.prev = this.tail;
        iter.next = null;
        this.tail = iter;
        iter = temp;
      }else{
        iter = iter.next;
      }
    }
  }

  /**
  * splitHelper() -- Splitting Helper Function
  *
  * Splits the partial list that starts at the given node after the given
  * number of nodes. In other words, it should disconnect the list after the
  * given number of nodes, and return a pointer to the head of the new
  * partial list.
  *
  * This function SHOULD NOT create ANY new List objects.
  *
  * @param start ListNode denoting the "head" of the partial list to work on.
  * @param splitPoint Desired point to split the list into two.
  * @return Pointer to the head of the partial list that results from the split.
  */
  splitHelper(start, splitPoint) {
    if(start.next == null) return start;
    var temp = start;
    for(let i=0; i<splitPoint-1; i++){
      if(temp.next == null) break;
      temp = temp.next;
    }
    this.tail = temp;
    var newHead = temp.next;
    temp.next = null;
    newHead.prev = null;
    return newHead;
  }

  /**
  * split() -- Splitting Function
  *
  * Splits the list into two lists after the given number of nodes.
  *
  * @param splitPoint Number of nodes after which to split the list.
  * @return The List that is created after the split point.
  */
  split(splitPoint) {
    if(splitPoint > this.length) {
      return new LinkedList();
    }

    let secondHead = this.splitHelper(this.head, splitPoint);

    // set up current list
    this.tail = this.head;
    while(this.tail.next) {
      this.tail = this.tail.next;
    }
    let oldLength = this.length;
    this.length = splitPoint;

    // set up the returned list
    let result = new LinkedList();
    result.head = secondHead;
    result.tail = secondHead;
    while(result.tail.next) {
      result.tail = result.tail.next;
    }
    result.length = oldLength - splitPoint;
    return result;
  }

  /**
  * mergeWith() -- Merging Function
  *
  * Merges the given list into the current list. Assumes that both lists are
  * sorted.
  *
  * This function uses your `merge()` function and is used for rendering the
  * images to the screen.
  *
  * @param otherList List to be merged with. Should be left empty by the function.
  */
  mergeWith(otherList) {
    // set up the current list
    this.head = this.merge(this.head, otherList.head);
    this.tail = this.head;
    while(this.tail !== null && this.tail.next !== null) {
      this.tail = this.tail.next;
    }
    this.length = this.length + otherList.length;

    // empty out the parameter list
    otherList.head = null;
    otherList.tail = null;
    otherList.length = 0;
  }

  /**
  * merge() -- Merging Helper Function
  *
  * Merges two sorted partial lists (starting at first and second
  * respectively) into one partial list. The new partial list should have
  * the data elements in increasing order.
  *
  * This function SHOULD NOT create ANY new List objects.
  *
  * @param first Head of the first sorted partial list
  * @param second Head of the second sorted partial list
  * @return A pointer to the head of the new, merged partial list
  */

  merge(first, second) {
    //console.log(first, second);
    var firstTemp = first;
    var secondTemp = second;
    var newest, head;
    var previous = undefined;


    while(firstTemp!=null && secondTemp!=null){
      // compare nodes' data: first list's node is bigger
      if(firstTemp.data.idx > secondTemp.data.idx){
        // head is not set
        if(previous == undefined){
          head = previous = secondTemp;
          previous.prev = null;
        }else{
          // head is set
          previous.next = secondTemp;
          secondTemp.prev = previous;
          previous = secondTemp;
        }
        secondTemp = secondTemp.next;
      }
      // compare nodes' data: second list's node is bigger
      else{
        // head is not set
        if(previous == undefined){
          head = previous = firstTemp;
          previous.prev = null;
        }else{
          // head is set
          previous.next = firstTemp;
          firstTemp.prev = previous;
          previous = firstTemp;
        }
        firstTemp = firstTemp.next;
      }
    }

    var temp = firstTemp==null ? secondTemp : firstTemp;
    previous.next = temp;

    return head;
  }

  /**
  * sort() -- Mergesort Sorting Function
  *
  * Sorts the current list by applying the Mergesort algorithm.
  * This function (and any helpers it calls):
  * - SHOULD NOT allocate any new memory.
  * - SHOULD NOT create any new Lists.
  * - SHOULD NOT create any new ListNodes.
  *
  * You should implement the given helper functions to solve this.
  */
  sort() {
    if (this.length === 0) {
      return;
    }
    console.log("HEAD:", this.head);
    this.head = this.mergesort(this.head, this.length);
    this.tail = this.head;
    while(this.tail.next) {
      this.tail = this.tail.next;
    }
  }

  /**
  * mergesort() -- Sorting Helper Function
  *
  * Sorts the partial list given a start node and a size.
  * This is the recursive helper for the Mergesort algorithm
  * (i.e., this is the divide-and-conquer step).
  *
  * @param start ListNode denoting the "head" of this partial list.
  * @param chainLength Size of the partial list.
  */
  mergesort(start, chainLength) {
    //console.log("start:", start, "length:", chainLength);
    // base case (1 node)
    if(start.next == null){
      //console.log("base case:", start);
      return start;
    }else{
      var start2 = this.splitHelper(start, Math.floor(chainLength/2));
      var left = this.mergesort(start, Math.floor(chainLength/2));
      var right = this.mergesort(start2, Math.floor(chainLength/2));

      //console.log("Merging...");
      return this.merge(left, right);   // always returns a ListNode
    }
  }
}

window.LinkedList = LinkedList;
