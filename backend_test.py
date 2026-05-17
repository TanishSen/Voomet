#!/usr/bin/env python3
"""
Backend API Tests for Voomet Leads API
Tests all endpoints: health, POST leads, GET leads, OPTIONS
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "http://localhost:5000"
API_BASE = f"{BASE_URL}/api"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_success(message):
    print(f"✅ SUCCESS: {message}")

def print_failure(message):
    print(f"❌ FAILURE: {message}")

def test_health_endpoint():
    """Test 1: GET /api/health"""
    print_test_header("GET /api/health - Health Check")
    
    try:
        url = f"{API_BASE}/health"
        print(f"Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok' and data.get('service') == 'voomet-api':
                print_success("Health endpoint returned correct response")
                return True
            else:
                print_failure(f"Health endpoint returned unexpected data: {data}")
                return False
        else:
            print_failure(f"Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_failure(f"Exception occurred: {str(e)}")
        return False

def test_create_lead_valid():
    """Test 2: POST /api/leads with valid data"""
    print_test_header("POST /api/leads - Create Lead (Valid Data)")
    
    try:
        url = f"{API_BASE}/leads"
        payload = {
            "name": "Refactor Test",
            "phone": "+919999999999",
            "email": "t@t.com",
            "requirement": "Office Interiors",
            "area": "1000-5000",
            "message": "Test after refactor",
            "source": "regression-test"
        }
        
        print(f"Request: POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get('ok') and 'lead' in data:
                lead = data['lead']
                
                # Verify required fields
                checks = []
                checks.append(('id exists', 'id' in lead))
                checks.append(('id is UUID format', len(lead.get('id', '')) == 36))
                checks.append(('name matches', lead.get('name') == payload['name']))
                checks.append(('phone matches', lead.get('phone') == payload['phone']))
                checks.append(('email matches', lead.get('email') == payload['email']))
                checks.append(('requirement matches', lead.get('requirement') == payload['requirement']))
                checks.append(('area matches', lead.get('area') == payload['area']))
                checks.append(('createdAt exists', 'createdAt' in lead))
                checks.append(('createdAt is ISO format', 'T' in lead.get('createdAt', '')))
                
                all_passed = True
                for check_name, result in checks:
                    if result:
                        print(f"  ✓ {check_name}")
                    else:
                        print(f"  ✗ {check_name}")
                        all_passed = False
                
                if all_passed:
                    print_success("Lead created successfully with all fields validated")
                    return True, lead.get('id')
                else:
                    print_failure("Some field validations failed")
                    return False, None
            else:
                print_failure(f"Response missing 'ok' or 'lead' field: {data}")
                return False, None
        else:
            print_failure(f"Expected status 201, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print_failure(f"Exception occurred: {str(e)}")
        return False, None

def test_create_lead_missing_fields():
    """Test 3: POST /api/leads with missing required fields"""
    print_test_header("POST /api/leads - Missing Required Fields")
    
    test_cases = [
        {"payload": {"phone": "+919876543210"}, "missing": "name"},
        {"payload": {"name": "Test User"}, "missing": "phone"},
        {"payload": {}, "missing": "both name and phone"}
    ]
    
    all_passed = True
    
    for test_case in test_cases:
        try:
            url = f"{API_BASE}/leads"
            payload = test_case['payload']
            missing = test_case['missing']
            
            print(f"\n  Testing with missing {missing}")
            print(f"  Payload: {json.dumps(payload, indent=2)}")
            
            response = requests.post(url, json=payload, timeout=10)
            print(f"  Status Code: {response.status_code}")
            print(f"  Response: {response.text}")
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data and 'Name and phone are required' in data['error']:
                    print(f"  ✓ Correctly rejected with 400 and proper error message")
                else:
                    print(f"  ✗ Got 400 but unexpected error message: {data}")
                    all_passed = False
            else:
                print(f"  ✗ Expected status 400, got {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print(f"  ✗ Exception occurred: {str(e)}")
            all_passed = False
    
    if all_passed:
        print_success("All validation tests passed")
        return True
    else:
        print_failure("Some validation tests failed")
        return False

def test_get_leads(expected_lead_id=None):
    """Test 4: GET /api/leads - List leads"""
    print_test_header("GET /api/leads - List Leads")
    
    try:
        url = f"{API_BASE}/leads"
        print(f"Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if 'leads' in data:
                leads = data['leads']
                print(f"Response: Retrieved {len(leads)} leads")
                
                if len(leads) > 0:
                    print(f"  First lead: {json.dumps(leads[0], indent=2)}")
                    
                    # Check if leads are sorted by createdAt desc
                    if len(leads) > 1:
                        first_date = leads[0].get('createdAt', '')
                        second_date = leads[1].get('createdAt', '')
                        if first_date >= second_date:
                            print(f"  ✓ Leads are sorted by createdAt descending")
                        else:
                            print(f"  ✗ Leads are NOT sorted correctly")
                    
                    # Check if our created lead is in the list
                    if expected_lead_id:
                        found = any(lead.get('id') == expected_lead_id for lead in leads)
                        if found:
                            print(f"  ✓ Previously created lead (id: {expected_lead_id}) found in list")
                        else:
                            print(f"  ✗ Previously created lead (id: {expected_lead_id}) NOT found in list")
                            print_failure("Created lead not found in listing")
                            return False
                
                print_success("GET /api/leads returned leads successfully")
                return True
            else:
                print_failure(f"Response missing 'leads' field: {data}")
                return False
        else:
            print_failure(f"Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_failure(f"Exception occurred: {str(e)}")
        return False

def test_options_cors():
    """Test 5: OPTIONS /api/leads - CORS preflight"""
    print_test_header("OPTIONS /api/leads - CORS Preflight")
    
    try:
        url = f"{API_BASE}/leads"
        print(f"Request: OPTIONS {url}")
        
        response = requests.options(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 204:
            headers = response.headers
            cors_origin = headers.get('Access-Control-Allow-Origin', '')
            
            if cors_origin == '*':
                print(f"  ✓ Access-Control-Allow-Origin: {cors_origin}")
                print_success("OPTIONS request returned 204 with correct CORS headers")
                return True
            else:
                print(f"  ✗ Access-Control-Allow-Origin: {cors_origin} (expected '*')")
                print_failure("CORS headers not correct")
                return False
        else:
            print_failure(f"Expected status 204, got {response.status_code}")
            return False
            
    except Exception as e:
        print_failure(f"Exception occurred: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("VOOMET BACKEND API TEST SUITE")
    print(f"Base URL: {BASE_URL}")
    print(f"API Base: {API_BASE}")
    print("="*80)
    
    results = {}
    created_lead_id = None
    
    # Test 1: Health check
    results['health'] = test_health_endpoint()
    
    # Test 2: Create lead with valid data
    success, lead_id = test_create_lead_valid()
    results['create_lead_valid'] = success
    if success:
        created_lead_id = lead_id
    
    # Test 3: Create lead with missing fields (validation)
    results['create_lead_validation'] = test_create_lead_missing_fields()
    
    # Test 4: Get leads list
    results['get_leads'] = test_get_leads(created_lead_id)
    
    # Test 5: OPTIONS CORS
    results['options_cors'] = test_options_cors()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    failed = total - passed
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {total} | Passed: {passed} | Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 ALL TESTS PASSED!")
        sys.exit(0)
    else:
        print(f"\n⚠️  {failed} TEST(S) FAILED")
        sys.exit(1)

if __name__ == "__main__":
    main()
