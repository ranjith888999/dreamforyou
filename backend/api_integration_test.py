"""
Enhanced API Integration Test with HTML Report Generation
Tests the entire DreamFood user flow through the API
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, List, Any
import traceback
from html import escape

# Configuration
BASE_URL = "http://localhost:8000/api"
FRONTEND_URL = "http://localhost:3000"
TEST_RESULTS = {
    "passed": [],
    "failed": [],
    "warnings": [],
    "total_tests": 0,
    "start_time": None,
    "end_time": None,
    "backend_status": "UNKNOWN",
    "frontend_status": "UNKNOWN",
}


class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'


def check_services():
    """Check if backend and frontend are running"""
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'=' * 70}")
    print("SERVICE AVAILABILITY CHECK")
    print(f"{'=' * 70}{Colors.END}\n")
    
    # Check backend
    try:
        response = requests.get(f"{BASE_URL}/restaurants", timeout=5)
        if response.status_code == 200:
            TEST_RESULTS["backend_status"] = "RUNNING"
            print(f"{Colors.GREEN}✅ Backend{Colors.END} is running at {BASE_URL}")
        else:
            TEST_RESULTS["backend_status"] = "RESPONDING (Check Status)"
            print(f"{Colors.YELLOW}⚠️ Backend{Colors.END} responding but unexpected status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        TEST_RESULTS["backend_status"] = "NOT_RUNNING"
        print(f"{Colors.RED}❌ Backend{Colors.END} is NOT running at {BASE_URL}")
        print(f"   {Colors.YELLOW}Please start backend with: python d:\\Python\\DremThings\\backend\\main.py{Colors.END}")
    except Exception as e:
        TEST_RESULTS["backend_status"] = "ERROR"
        print(f"{Colors.RED}❌ Backend error{Colors.END}: {str(e)}")
    
    # Check frontend
    try:
        response = requests.get(FRONTEND_URL, timeout=5)
        if response.status_code == 200:
            TEST_RESULTS["frontend_status"] = "RUNNING"
            print(f"{Colors.GREEN}✅ Frontend{Colors.END} is running at {FRONTEND_URL}")
        else:
            TEST_RESULTS["frontend_status"] = "RESPONDING (Check Status)"
            print(f"{Colors.YELLOW}⚠️ Frontend{Colors.END} responding but unexpected status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        TEST_RESULTS["frontend_status"] = "NOT_RUNNING"
        print(f"{Colors.YELLOW}⚠️ Frontend{Colors.END} is NOT running at {FRONTEND_URL}")
        print(f"   {Colors.YELLOW}Please start frontend with: npm run dev (in frontend directory){Colors.END}")
    except Exception as e:
        TEST_RESULTS["frontend_status"] = "ERROR"
        print(f"{Colors.YELLOW}⚠️ Frontend error{Colors.END}: {str(e)}")
    
    print()


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
        TEST_RESULTS["passed"].append({"test": test_name, "message": message})
    else:
        TEST_RESULTS["failed"].append({"test": test_name, "message": message})


def test_get_restaurants():
    """Test 1: Fetch all restaurants"""
    print_section("TEST 1: GET RESTAURANTS")
    
    try:
        response = requests.get(f"{BASE_URL}/restaurants", params={"skip": 0, "limit": 100}, timeout=10)
        
        if response.status_code == 200:
            restaurants = response.json()
            
            tests_passed = isinstance(restaurants, list) and len(restaurants) > 0
            
            if tests_passed:
                message_parts = [f"Found {len(restaurants)} restaurants"]
                
                # Validate first restaurant
                first = restaurants[0]
                required_fields = ["id", "name", "cuisine_type", "rating", "review_count", "delivery_time"]
                missing = [f for f in required_fields if f not in first]
                
                if missing:
                    tests_passed = False
                    message_parts.append(f"Missing fields: {missing}")
                else:
                    message_parts.append("All required fields present")
                    print(f"\n{Colors.YELLOW}Sample Restaurant:{Colors.END}")
                    print(f"  Name: {first.get('name')}")
                    print(f"  Rating: {first.get('rating')} ({first.get('review_count')} reviews)")
                    print(f"  Delivery: {first.get('delivery_time')} mins")
            else:
                message_parts = ["No restaurants found or invalid response"]
            
            print_test("Get Restaurants", tests_passed, " | ".join(message_parts))
            return restaurants if tests_passed else None
            
        else:
            print_test("Get Restaurants", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Restaurants", False, f"Exception: {str(e)}")
        return None


def test_get_restaurant_details(restaurant_id: int):
    """Test 2: Fetch specific restaurant"""
    print_section(f"TEST 2: GET RESTAURANT DETAILS (ID: {restaurant_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/restaurants/{restaurant_id}", timeout=10)
        
        if response.status_code == 200:
            restaurant = response.json()
            
            required_fields = ["id", "name", "description", "cuisine_type", "rating", "review_count", "delivery_time", "address"]
            missing = [f for f in required_fields if f not in restaurant]
            
            tests_passed = len(missing) == 0
            
            if tests_passed:
                print(f"\n{Colors.YELLOW}Restaurant Details:{Colors.END}")
                print(f"  Name: {restaurant.get('name')}")
                print(f"  Description: {restaurant.get('description')}")
                print(f"  Address: {restaurant.get('address')}")
                print(f"  Rating: {restaurant.get('rating')} ({restaurant.get('review_count')} reviews)")
                print_test("Get Restaurant Details", True, f"Restaurant: {restaurant.get('name')}")
            else:
                print_test("Get Restaurant Details", False, f"Missing: {missing}")
            
            return restaurant if tests_passed else None
            
        else:
            print_test("Get Restaurant Details", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Restaurant Details", False, str(e))
        return None


def test_get_menu_items(restaurant_id: int):
    """Test 3: Fetch menu items"""
    print_section(f"TEST 3: GET MENU ITEMS (Restaurant ID: {restaurant_id})")
    
    try:
        # Correct endpoint: /menu/restaurant/{restaurant_id}
        response = requests.get(f"{BASE_URL}/menu/restaurant/{restaurant_id}", params={"skip": 0, "limit": 100}, timeout=10)
        
        if response.status_code == 200:
            menu_items = response.json()
            
            tests_passed = isinstance(menu_items, list) and len(menu_items) > 0
            message = f"Found {len(menu_items)} items"
            
            if menu_items and tests_passed:
                first = menu_items[0]
                required = ["id", "name", "price", "description"]
                missing = [f for f in required if f not in first]
                
                if missing:
                    tests_passed = False
                    message += f" (Missing: {missing})"
                else:
                    print(f"\n{Colors.YELLOW}Sample Menu Items:{Colors.END}")
                    for item in menu_items[:3]:
                        print(f"  • {item.get('name')} - ₹{item.get('price')}")
            
            print_test("Get Menu Items", tests_passed, message)
            return menu_items if tests_passed else None
            
        else:
            print_test("Get Menu Items", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Menu Items", False, str(e))
        return None


def test_create_user() -> Dict:
    """Test: Create a test user for order placement"""
    print_section("TEST: CREATE TEST USER")
    
    try:
        # Try to create user directly in database
        from app.database import SessionLocal
        from app.models import User
        
        session = SessionLocal()
        
        # Check if user already exists
        user = session.query(User).filter(User.email == "test@example.com").first()
        
        if not user:
            # Create new user
            user = User(
                email="test@example.com",
                username="testuser",
                full_name="Test User",
                is_active=True
            )
            session.add(user)
            session.commit()
            session.refresh(user)
        
        user_id = user.id
        session.close()
        
        print(f"\n{Colors.YELLOW}Test User Found/Created:{Colors.END}")
        print(f"  User ID: {user_id}")
        print(f"  Email: test@example.com")
        
        print_test("Create Test User", True, f"User ID: {user_id}")
        return {"id": user_id, "email": "test@example.com"}
            
    except Exception as e:
        print_test("Create Test User", False, str(e))
        return None


def test_create_order(menu_items: List[Dict], restaurant_id: int, user_id: int) -> Dict:
    """Test 4: Create an order"""
    print_section("TEST 4: CREATE ORDER")
    
    try:
        if not menu_items or len(menu_items) < 2:
            print_test("Create Order", False, "Not enough menu items")
            return None
        
        selected = menu_items[:2]
        
        order_items = [
            {
                "menu_item_id": item["id"],
                "quantity": 1,
                "price": item["price"]
            }
            for item in selected
        ]
        
        subtotal = sum(item["price"] for item in selected)
        delivery_charge = 50.0
        gst = subtotal * 0.18  # 18% GST
        total_amount = subtotal + delivery_charge + gst
        
        payload = {
            "user_id": user_id,
            "restaurant_id": restaurant_id,
            "items": order_items,
            "subtotal": subtotal,
            "delivery_charge": delivery_charge,
            "gst": gst,
            "total_amount": total_amount,
            "delivery_address": "123 Main Street, New York, NY 10001",
            "estimated_delivery_time": 18,
            "special_instructions": "Please ring the doorbell twice"
        }
        
        response = requests.post(f"{BASE_URL}/orders", json=payload, timeout=10)
        
        if response.status_code == 200:
            order = response.json()
            
            print(f"\n{Colors.YELLOW}Order Created:{Colors.END}")
            print(f"  Order ID: {order.get('id')}")
            print(f"  Order Number: {order.get('order_number')}")
            print(f"  Subtotal: ₹{order.get('subtotal')}")
            print(f"  Total: ₹{order.get('total_amount')}")
            print(f"  Status: {order.get('status')}")
            print(f"  Items: {len(selected)}")
            
            print_test("Create Order", True, f"Order ID: {order.get('id')}")
            return order
            
        else:
            error_msg = f"Status {response.status_code}"
            try:
                error_msg += f" - {response.json()}"
            except:
                error_msg += f" - {response.text}"
            print_test("Create Order", False, error_msg)
            return None
            
    except Exception as e:
        print_test("Create Order", False, str(e))
        return None


def test_get_order(order_id: int):
    """Test 5: Get order details"""
    print_section(f"TEST 5: GET ORDER (ID: {order_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/orders/{order_id}", timeout=10)
        
        if response.status_code == 200:
            order = response.json()
            
            required = ["id", "total_amount", "status"]
            missing = [f for f in required if f not in order]
            
            tests_passed = len(missing) == 0
            
            if tests_passed:
                print(f"\n{Colors.YELLOW}Order Details:{Colors.END}")
                print(f"  ID: {order.get('id')}")
                print(f"  Order Number: {order.get('order_number')}")
                print(f"  Total: ₹{order.get('total_amount')}")
                print(f"  Status: {order.get('status')}")
                print(f"  Delivery Address: {order.get('delivery_address')}")
                
                print_test("Get Order", True, f"Status: {order.get('status')}")
            else:
                print_test("Get Order", False, f"Missing: {missing}")
            
            return order if tests_passed else None
            
        else:
            print_test("Get Order", False, f"Status: {response.status_code}")
            return None
            
    except Exception as e:
        print_test("Get Order", False, str(e))
        return None


def test_update_order_status(order_id: int):
    """Test 6: Update order status"""
    print_section(f"TEST 6: UPDATE ORDER STATUS (ID: {order_id})")
    
    stages = ["confirmed", "preparing", "packed", "assigned", "picked_up", "in_transit", "delivered"]
    all_passed = True
    
    for stage in stages:
        try:
            response = requests.put(
                f"{BASE_URL}/orders/{order_id}",
                json={"status": stage},
                timeout=10
            )
            
            passed = response.status_code == 200
            if not passed:
                all_passed = False
            
            print_test(f"Update to '{stage}'", passed, f"Status: {response.status_code}")
            time.sleep(0.3)
            
        except Exception as e:
            print_test(f"Update to '{stage}'", False, str(e))
            all_passed = False
    
    return all_passed


def test_get_order_tracking(order_id: int):
    """Test 7: Get order tracking"""
    print_section(f"TEST 7: GET ORDER TRACKING (ID: {order_id})")
    
    try:
        response = requests.get(f"{BASE_URL}/orders/{order_id}/tracking", timeout=10)
        
        if response.status_code == 200:
            tracking = response.json()
            
            is_list = isinstance(tracking, list)
            count = len(tracking) if is_list else 1
            
            print(f"\n{Colors.YELLOW}Order Tracking:{Colors.END}")
            if is_list:
                for stage in tracking[:5]:  # Show first 5
                    print(f"  • {stage.get('status', 'unknown')} - {stage.get('updated_at', 'N/A')}")
                if len(tracking) > 5:
                    print(f"  ... and {len(tracking) - 5} more")
            else:
                print(f"  Status: {tracking.get('status')}")
            
            print_test("Get Order Tracking", True, f"Retrieved {count} tracking entries")
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
    print("║" + "DREAMFOOD API - COMPREHENSIVE FLOW TEST".center(68) + "║")
    print("║" + f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}".center(68) + "║")
    print("╚" + "=" * 68 + "╝")
    print(Colors.END)
    
    # Check services first
    check_services()
    
    if TEST_RESULTS["backend_status"] != "RUNNING":
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Backend is not running!{Colors.END}")
        print(f"{Colors.YELLOW}To start the backend, run:{Colors.END}")
        print(f"   python d:\\Python\\DremThings\\backend\\main.py")
        generate_summary()
        return
    
    # Test 1: Get Restaurants
    restaurants = test_get_restaurants()
    if not restaurants:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Cannot continue without restaurants{Colors.END}")
        generate_summary()
        return
    
    restaurant_id = restaurants[0]["id"]
    
    # Test 2: Get Restaurant Details
    restaurant = test_get_restaurant_details(restaurant_id)
    if not restaurant:
        print(f"\n{Colors.YELLOW}⚠️  Continuing despite restaurant detail error{Colors.END}")
    
    # Test 3: Get Menu Items
    menu_items = test_get_menu_items(restaurant_id)
    if not menu_items:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Cannot create order without menu items{Colors.END}")
        generate_summary()
        return
    
    # Attach restaurant_id to items
    for item in menu_items:
        item["restaurant_id"] = restaurant_id
    
    # Create test user for order
    test_user = test_create_user()
    if not test_user:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Cannot create user for order{Colors.END}")
        generate_summary()
        return
    
    user_id = test_user.get("id")
    
    # Test 4: Create Order
    order = test_create_order(menu_items, restaurant_id, user_id)
    if not order:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  Order creation failed{Colors.END}")
        generate_summary()
        return
    
    order_id = order["id"]
    
    # Test 5: Get Order
    test_get_order(order_id)
    
    # Test 6: Update Status
    test_update_order_status(order_id)
    
    # Test 7: Get Tracking
    test_get_order_tracking(order_id)
    
    # Generate Summary
    TEST_RESULTS["end_time"] = datetime.now()
    generate_summary()


def generate_summary():
    """Generate and display test summary"""
    print_section("TEST SUMMARY")
    
    if TEST_RESULTS["end_time"] is None:
        TEST_RESULTS["end_time"] = datetime.now()
    
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
    
    print(f"\n{Colors.BOLD}Service Status:{Colors.END}")
    print(f"  Backend: {TEST_RESULTS['backend_status']}")
    print(f"  Frontend: {TEST_RESULTS['frontend_status']}")
    
    if failed > 0:
        print(f"\n{Colors.BOLD}{Colors.RED}Failed Tests:{Colors.END}")
        for item in TEST_RESULTS["failed"]:
            print(f"  ❌ {item['test']}")
            if item['message']:
                print(f"     └─ {item['message']}")
    
    # Overall Result
    print(f"\n{Colors.BOLD}Overall Result:{Colors.END}")
    if failed == 0 and total > 0:
        print(f"{Colors.GREEN}{Colors.BOLD}✅ ALL TESTS PASSED!{Colors.END}")
        print(f"   The DreamFood API is working properly!")
    elif total == 0:
        print(f"{Colors.YELLOW}{Colors.BOLD}⚠️  No tests were executed.{Colors.END}")
        print(f"   Please ensure the backend is running.")
    else:
        print(f"{Colors.YELLOW}{Colors.BOLD}⚠️  Some tests failed.{Colors.END}")
        print(f"   Please review the errors above.")
    
    # Save JSON report
    save_json_report()
    save_html_report()


def save_json_report():
    """Save test results to JSON"""
    report_file = "api_test_results.json"
    
    summary = {
        "status": "SUCCESS" if len(TEST_RESULTS["failed"]) == 0 else "FAILED",
        "passed_tests": len(TEST_RESULTS["passed"]),
        "failed_tests": len(TEST_RESULTS["failed"]),
        "total_tests": TEST_RESULTS["total_tests"],
        "pass_rate": f"{(len(TEST_RESULTS['passed']) / TEST_RESULTS['total_tests'] * 100 if TEST_RESULTS['total_tests'] > 0 else 0):.1f}%",
        "duration_seconds": (TEST_RESULTS["end_time"] - TEST_RESULTS["start_time"]).total_seconds(),
        "backend_status": TEST_RESULTS["backend_status"],
        "frontend_status": TEST_RESULTS["frontend_status"],
        "timestamp": datetime.now().isoformat(),
        "details": {
            "passed": TEST_RESULTS["passed"],
            "failed": TEST_RESULTS["failed"]
        }
    }
    
    with open(report_file, "w") as f:
        json.dump(summary, f, indent=2, default=str)
    
    print(f"{Colors.YELLOW}📊 JSON report saved to: {report_file}{Colors.END}\n")


def save_html_report():
    """Generate HTML test report"""
    report_file = "api_test_report.html"
    
    passed = len(TEST_RESULTS["passed"])
    failed = len(TEST_RESULTS["failed"])
    total = TEST_RESULTS["total_tests"]
    pass_rate = (passed / total * 100) if total > 0 else 0
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DreamFood API Test Report</title>
        <style>
            * {{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }}
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 40px 20px;
            }}
            .container {{
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                overflow: hidden;
            }}
            header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px;
                text-align: center;
            }}
            h1 {{
                font-size: 2.5em;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }}
            .timestamp {{
                font-size: 0.9em;
                opacity: 0.9;
            }}
            .summary {{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                padding: 30px;
                background: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
            }}
            .stat-card {{
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                text-align: center;
            }}
            .stat-number {{
                font-size: 2.5em;
                font-weight: bold;
                margin: 10px 0;
            }}
            .stat-label {{
                color: #666;
                font-size: 0.9em;
            }}
            .passed {{ color: #28a745; }}
            .failed {{ color: #dc3545; }}
            .total {{ color: #007bff; }}
            .percentage {{ color: #17a2b8; }}
            
            .status {{
                padding: 30px;
                background: #f8f9fa;
            }}
            .status-item {{
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #dee2e6;
            }}
            .status-label {{
                font-weight: 500;
                color: #333;
            }}
            .status-value {{
                color: #666;
            }}
            
            .tests-section {{
                padding: 30px;
            }}
            .test-list {{
                list-style: none;
            }}
            .test-item {{
                padding: 15px;
                margin: 10px 0;
                border-left: 4px solid #dee2e6;
                background: #f8f9fa;
                border-radius: 4px;
            }}
            .test-item.pass {{
                border-left-color: #28a745;
                background: #d4edda;
            }}
            .test-item.fail {{
                border-left-color: #dc3545;
                background: #f8d7da;
            }}
            .test-icon {{
                font-size: 1.2em;
                margin-right: 10px;
            }}
            .test-name {{
                font-weight: 500;
                color: #333;
                margin-bottom: 5px;
            }}
            .test-message {{
                font-size: 0.9em;
                color: #666;
                margin-left: 25px;
            }}
            
            h2 {{
                color: #333;
                margin-bottom: 20px;
                border-bottom: 2px solid #667eea;
                padding-bottom: 10px;
            }}
            
            .footer {{
                text-align: center;
                padding: 20px;
                background: #f8f9fa;
                color: #666;
                font-size: 0.9em;
                border-top: 1px solid #dee2e6;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>🍕 DreamFood API Test Report</h1>
                <div class="timestamp">Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</div>
            </header>
            
            <div class="summary">
                <div class="stat-card">
                    <div class="stat-label">Total Tests</div>
                    <div class="stat-number total">{total}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Passed</div>
                    <div class="stat-number passed">{passed}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Failed</div>
                    <div class="stat-number failed">{failed}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Pass Rate</div>
                    <div class="stat-number percentage">{pass_rate:.1f}%</div>
                </div>
            </div>
            
            <div class="status">
                <h2>Service Status</h2>
                <div class="status-item">
                    <span class="status-label">Backend API</span>
                    <span class="status-value">{TEST_RESULTS['backend_status']}</span>
                </div>
                <div class="status-item">
                    <span class="status-label">Frontend App</span>
                    <span class="status-value">{TEST_RESULTS['frontend_status']}</span>
                </div>
            </div>
            
            <div class="tests-section">
                <h2>✅ Passed Tests ({len(TEST_RESULTS['passed'])})</h2>
                <ul class="test-list">
    """
    
    for test in TEST_RESULTS["passed"]:
        html_content += f"""
                    <li class="test-item pass">
                        <div class="test-icon">✅</div>
                        <div class="test-name">{escape(test['test'])}</div>
                        {f'<div class="test-message">{escape(test["message"])}</div>' if test.get('message') else ''}
                    </li>
        """
    
    html_content += """
                </ul>
            </div>
    """
    
    if failed > 0:
        html_content += f"""
            <div class="tests-section">
                <h2>❌ Failed Tests ({len(TEST_RESULTS['failed'])})</h2>
                <ul class="test-list">
        """
        
        for test in TEST_RESULTS["failed"]:
            html_content += f"""
                    <li class="test-item fail">
                        <div class="test-icon">❌</div>
                        <div class="test-name">{escape(test['test'])}</div>
                        {f'<div class="test-message">{escape(test["message"])}</div>' if test.get('message') else ''}
                    </li>
            """
        
        html_content += """
                </ul>
            </div>
        """
    
    html_content += f"""
            <div class="footer">
                <p>DreamFood API Test Suite | Report generated on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S')}</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    with open(report_file, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"{Colors.YELLOW}HTML report saved to: {report_file}{Colors.END}")


if __name__ == "__main__":
    try:
        test_complete_flow()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Test interrupted by user.{Colors.END}")
    except Exception as e:
        print(f"\n{Colors.RED}Unexpected error: {e}{Colors.END}")
        traceback.print_exc()
