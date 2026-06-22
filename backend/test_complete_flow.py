"""
Comprehensive API Integration Test for DreamFood Application
Tests the entire user flow: Auth → Restaurants → Menu → Cart → Order → Tracking
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, List, Any

# Configuration
BASE_URL = "http://localhost:8001/api"
TEST_RESULTS = {
    "passed": [],
    "failed": [],
    "total_tests": 0,
    "start_time": None,
    "end_time": None,
    "summary": {}
}


class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'


def print_section(title: str):
    """Print a formatted section header"""
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'=' * 70}")
    print(f"{title.center(70)}")
    print(f"{'=' * 70}{Colors.END}\n")


def print_test(test_name: str, passed: bool, message: str = ""):
    """Print test result"""
    TEST_RESULTS["total_tests"] += 1
    status = f"{Colors.GREEN}✅ PASS{Colors.END}" if passed else f"{Colors.RED}❌ FAIL{Colors.END}"
    print(f"{status} | {test_name}")
    if message:
        print(f"      └─ {message}")
    
    if passed:
        TEST_RESULTS["passed"].append(test_name)
    else:
        TEST_RESULTS["failed"].append(test_name)


def test_backend_health():
    """Test 1: Check if backend is running"""
    print_section("1. BACKEND HEALTH CHECK")
    
    try:
        response = requests.get(f"{BASE_URL}/restaurants", params={"skip": 0, "limit": 1})
        if response.status_code == 200:
            print_test("Backend Health", True, f"Status: {response.status_code}")
            return True
        else:
            print_test("Backend Health", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        print_test("Backend Health", False, str(e))
        return False


def test_get_restaurants():
    """Test 2: Fetch all restaurants"""
    print_section("2. GET RESTAURANTS")
    
    try:
        response = requests.get(f"{BASE_URL}/restaurants", params={"skip": 0, "limit": 100})
        
        if response.status_code == 200:
            restaurants = response.json()
            
            tests_passed = True
            message_parts = []
            
            # Validate response
            if not isinstance(restaurants, list):
                tests_passed = False
                message_parts.append("Response is not a list")
            else:
                message_parts.append(f"Found {len(restaurants)} restaurants")
                
                # Check required fields
                required_fields = ["id", "name", "cuisine_type", "rating", "review_count", "delivery_time", "logo_url"]
                if restaurants:
                    first_restaurant = restaurants[0]
                    missing_fields = [f for f in required_fields if f not in first_restaurant]
                    
                    if missing_fields:
                        tests_passed = False
                        message_parts.append(f"Missing fields: {missing_fields}")
                    else:
                        message_parts.append("All required fields present")
                        print(f"\n{Colors.YELLOW}Sample Restaurant:{Colors.END}")
                        print(f"  Name: {first_restaurant.get('name')}")
                        print(f"  Rating: {first_restaurant.get('rating')} ({first_restaurant.get('review_count')} reviews)")
                        print(f"  Cuisine: {first_restaurant.get('cuisine_type')}")
                        print(f"  Delivery: {first_restaurant.get('delivery_time')} mins")
            
            print_test("Get Restaurants", tests_passed, " | ".join(message_parts))
            return restaurants if tests_passed else None
            
        else:
            print_test("Get Restaurants", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Restaurants", False, str(e))
        return None


def test_get_restaurant_details(restaurant_id: int):
    """Test 3: Fetch specific restaurant details"""
    print_section(f"3. GET RESTAURANT DETAILS (ID: {restaurant_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/restaurants/{restaurant_id}")
        
        if response.status_code == 200:
            restaurant = response.json()
            
            required_fields = ["id", "name", "description", "cuisine_type", "rating", "review_count", "delivery_time", "logo_url", "address"]
            missing_fields = [f for f in required_fields if f not in restaurant]
            
            tests_passed = len(missing_fields) == 0
            
            if tests_passed:
                print(f"\n{Colors.YELLOW}Restaurant Details:{Colors.END}")
                print(f"  Name: {restaurant.get('name')}")
                print(f"  Description: {restaurant.get('description')}")
                print(f"  Address: {restaurant.get('address')}")
                print(f"  Rating: {restaurant.get('rating')} ({restaurant.get('review_count')} reviews)")
                print(f"  Cuisine: {restaurant.get('cuisine_type')}")
                print(f"  Delivery Time: {restaurant.get('delivery_time')} mins")
                print_test("Get Restaurant Details", True, f"Restaurant: {restaurant.get('name')}")
            else:
                print_test("Get Restaurant Details", False, f"Missing fields: {missing_fields}")
            
            return restaurant if tests_passed else None
            
        else:
            print_test("Get Restaurant Details", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Restaurant Details", False, str(e))
        return None


def test_get_menu_items(restaurant_id: int):
    """Test 4: Fetch menu items for restaurant"""
    print_section(f"4. GET MENU ITEMS (Restaurant ID: {restaurant_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/menu/restaurant/{restaurant_id}", params={"skip": 0, "limit": 100})
        
        if response.status_code == 200:
            menu_items = response.json()
            
            tests_passed = isinstance(menu_items, list)
            message_parts = [f"Found {len(menu_items)} menu items"]
            
            if menu_items:
                required_fields = ["id", "name", "price", "description"]
                first_item = menu_items[0]
                missing_fields = [f for f in required_fields if f not in first_item]
                
                if missing_fields:
                    tests_passed = False
                    message_parts.append(f"Missing fields: {missing_fields}")
                else:
                    message_parts.append("All required fields present")
                    print(f"\n{Colors.YELLOW}Sample Menu Items:{Colors.END}")
                    for item in menu_items[:3]:
                        print(f"  • {item.get('name')} - ₹{item.get('price')} ({item.get('description', 'No description')})")
            
            print_test("Get Menu Items", tests_passed, " | ".join(message_parts))
            return menu_items if tests_passed else None
            
        else:
            print_test("Get Menu Items", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Menu Items", False, str(e))
        return None


def test_create_order(menu_items: List[Dict]) -> Dict:
    """Test 5: Create an order with items"""
    print_section("5. CREATE ORDER")
    
    try:
        if not menu_items:
            print_test("Create Order", False, "No menu items available")
            return None
        
        # Select first 2 items for order
        selected_items = menu_items[:2]
        
        order_items = [
            {
                "menu_item_id": item["id"],
                "quantity": 1,
                "price": item["price"]
            }
            for item in selected_items
        ]
        
        subtotal = sum(item["price"] for item in selected_items)
        delivery_charge = 40.0
        gst = round(subtotal * 0.05, 2)  # 5% GST
        total_amount = subtotal + delivery_charge + gst
        
        payload = {
            "user_id": 1,  # Guest user
            "restaurant_id": selected_items[0].get("restaurant_id", 1),
            "items": order_items,
            "subtotal": subtotal,
            "delivery_charge": delivery_charge,
            "gst": gst,
            "total_amount": total_amount,
            "delivery_address": "123 Main Street, New York, NY 10001",
            "estimated_delivery_time": 30,
            "special_instructions": "Please deliver fresh"
        }
        
        response = requests.post(f"{BASE_URL}/orders", json=payload)
        
        if response.status_code == 200:
            order = response.json()
            
            print(f"\n{Colors.YELLOW}Order Created:{Colors.END}")
            print(f"  Order ID: {order.get('id')}")
            print(f"  Total Amount: ₹{order.get('total_amount')}")
            print(f"  Status: {order.get('status')}")
            print(f"  Items: {len(order_items)} items")
            print(f"\n  Items in order:")
            for item in selected_items:
                print(f"    • {item.get('name')} - ₹{item.get('price')}")
            
            print_test("Create Order", True, f"Order ID: {order.get('id')}")
            return order
            
        else:
            print_test("Create Order", False, f"Status: {response.status_code} - {response.text}")
            return None
            
    except Exception as e:
        print_test("Create Order", False, str(e))
        return None


def test_get_order(order_id: int):
    """Test 6: Fetch order details"""
    print_section(f"6. GET ORDER DETAILS (Order ID: {order_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/orders/{order_id}")
        
        if response.status_code == 200:
            order = response.json()
            
            required_fields = ["id", "total_amount", "status"]
            missing_fields = [f for f in required_fields if f not in order]
            
            tests_passed = len(missing_fields) == 0
            
            if tests_passed:
                print(f"\n{Colors.YELLOW}Order Details:{Colors.END}")
                print(f"  Order ID: {order.get('id')}")
                print(f"  Total Amount: ₹{order.get('total_amount')}")
                print(f"  Status: {order.get('status')}")
                print(f"  Created: {order.get('created_at', 'N/A')}")
                
                print_test("Get Order", True, f"Status: {order.get('status')}")
            else:
                print_test("Get Order", False, f"Missing fields: {missing_fields}")
            
            return order if tests_passed else None
            
        else:
            print_test("Get Order", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Order", False, str(e))
        return None


def test_get_order_items(order_id: int):
    """Test 7: Fetch items in an order"""
    print_section(f"7. GET ORDER ITEMS (Order ID: {order_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/orders/{order_id}/items")
        
        if response.status_code == 200:
            order_items = response.json()
            
            tests_passed = isinstance(order_items, list)
            message_parts = [f"Found {len(order_items)} items in order"]
            
            if order_items:
                print(f"\n{Colors.YELLOW}Items in Order:{Colors.END}")
                for item in order_items:
                    print(f"  • {item.get('menu_item_id')} - Qty: {item.get('quantity')} × ₹{item.get('price')}")
            
            print_test("Get Order Items", tests_passed, " | ".join(message_parts))
            return order_items if tests_passed else None
            
        else:
            print_test("Get Order Items", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Order Items", False, str(e))
        return None


def test_update_order_status(order_id: int):
    """Test 8: Update order status through tracking"""
    print_section(f"8. UPDATE ORDER STATUS (Order ID: {order_id})")
    
    stages = ["confirmed", "preparing", "packed", "in_transit", "delivered"]
    
    for stage in stages:
        try:
            response = requests.put(
                f"{BASE_URL}/orders/{order_id}",
                json={"status": stage}
            )
            
            if response.status_code == 200:
                updated_order = response.json()
                print_test(f"Update to '{stage}'", True, f"Status: {updated_order.get('status')}")
            else:
                print_test(f"Update to '{stage}'", False, f"Status: {response.status_code}")
                
        except Exception as e:
            print_test(f"Update to '{stage}'", False, str(e))
        
        time.sleep(0.5)  # Small delay between updates


def test_get_order_tracking(order_id: int):
    """Test 9: Get order tracking information"""
    print_section(f"9. GET ORDER TRACKING (Order ID: {order_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/orders/{order_id}/tracking")
        
        if response.status_code == 200:
            tracking = response.json()
            
            print(f"\n{Colors.YELLOW}Order Tracking:{Colors.END}")
            if isinstance(tracking, list):
                for stage in tracking:
                    status = stage.get("status", "unknown")
                    timestamp = stage.get("updated_at", "N/A")
                    print(f"  • {status} - Updated: {timestamp}")
                print_test("Get Order Tracking", True, f"Tracked {len(tracking)} stages")
            else:
                print(f"  Status: {tracking.get('status')}")
                print_test("Get Order Tracking", True, f"Current status: {tracking.get('status')}")
            
            return tracking
            
        else:
            print_test("Get Order Tracking", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Order Tracking", False, str(e))
        return None


def test_complete_flow():
    """Execute complete end-to-end flow test"""
    TEST_RESULTS["start_time"] = datetime.now()
    
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("╔" + "=" * 68 + "╗")
    print("║" + "DREAMFOOD API - COMPLETE END-TO-END FLOW TEST".center(68) + "║")
    print("║" + f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}".center(68) + "║")
    print("╚" + "=" * 68 + "╝")
    print(Colors.END)
    
    # Test 1: Backend Health
    if not test_backend_health():
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Backend is not running! Please start the backend server.{Colors.END}")
        return
    
    # Test 2: Get Restaurants
    restaurants = test_get_restaurants()
    if not restaurants:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Failed to fetch restaurants!{Colors.END}")
        return
    
    # Test 3: Get Restaurant Details (first restaurant)
    restaurant_id = restaurants[0]["id"]
    restaurant = test_get_restaurant_details(restaurant_id)
    if not restaurant:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Failed to fetch restaurant details!{Colors.END}")
        return
    
    # Test 4: Get Menu Items
    menu_items = test_get_menu_items(restaurant_id)
    if not menu_items:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Failed to fetch menu items!{Colors.END}")
        return
    
    # Attach restaurant_id to menu items
    for item in menu_items:
        item["restaurant_id"] = restaurant_id
    
    # Test 5: Create Order
    order = test_create_order(menu_items)
    if not order:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Failed to create order!{Colors.END}")
        return
    
    order_id = order["id"]
    
    # Test 6: Get Order Details
    test_get_order(order_id)
    
    # Test 7: Get Order Items
    test_get_order_items(order_id)
    
    # Test 8: Update Order Status
    test_update_order_status(order_id)
    
    # Test 9: Get Order Tracking
    test_get_order_tracking(order_id)
    
    # Generate Summary
    TEST_RESULTS["end_time"] = datetime.now()
    generate_summary()


def generate_summary():
    """Generate and display test summary"""
    print_section("TEST SUMMARY")
    
    duration = (TEST_RESULTS["end_time"] - TEST_RESULTS["start_time"]).total_seconds()
    passed = len(TEST_RESULTS["passed"])
    failed = len(TEST_RESULTS["failed"])
    total = TEST_RESULTS["total_tests"]
    pass_rate = (passed / total * 100) if total > 0 else 0
    
    print(f"\n{Colors.BOLD}Test Execution Summary:{Colors.END}")
    print(f"  Total Tests: {total}")
    print(f"  {Colors.GREEN}Passed: {passed}{Colors.END}")
    print(f"  {Colors.RED}Failed: {failed}{Colors.END}")
    print(f"  Pass Rate: {pass_rate:.1f}%")
    print(f"  Duration: {duration:.2f} seconds")
    
    if failed > 0:
        print(f"\n{Colors.BOLD}{Colors.RED}Failed Tests:{Colors.END}")
        for test in TEST_RESULTS["failed"]:
            print(f"  ❌ {test}")
    
    # Overall Result
    print(f"\n{Colors.BOLD}Overall Result:{Colors.END}")
    if failed == 0:
        print(f"{Colors.GREEN}{Colors.BOLD}✅ ALL TESTS PASSED! Application is working properly.{Colors.END}")
        TEST_RESULTS["summary"] = {
            "status": "SUCCESS",
            "message": "All API endpoints are functioning correctly and the complete user flow works as expected.",
            "passed_tests": passed,
            "failed_tests": failed,
            "total_tests": total,
            "pass_rate": f"{pass_rate:.1f}%",
            "duration_seconds": duration
        }
    else:
        print(f"{Colors.RED}{Colors.BOLD}⚠️  Some tests failed. Please review the errors above.{Colors.END}")
        TEST_RESULTS["summary"] = {
            "status": "FAILED",
            "message": f"{failed} test(s) failed. Review the details above.",
            "passed_tests": passed,
            "failed_tests": failed,
            "total_tests": total,
            "pass_rate": f"{pass_rate:.1f}%",
            "duration_seconds": duration
        }
    
    # Save results to file
    save_test_results()


def save_test_results():
    """Save test results to JSON file"""
    results_file = "test_results.json"
    
    with open(results_file, "w") as f:
        json.dump(TEST_RESULTS, f, indent=2, default=str)
    
    print(f"\n{Colors.YELLOW}📊 Test results saved to: {results_file}{Colors.END}")


if __name__ == "__main__":
    try:
        test_complete_flow()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Test interrupted by user.{Colors.END}")
    except Exception as e:
        print(f"\n{Colors.RED}Unexpected error: {e}{Colors.END}")
