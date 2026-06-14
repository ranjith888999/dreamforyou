"""
Start backend server and run API tests
"""
import subprocess
import time
import os
import sys

def start_backend():
    """Start the FastAPI backend server"""
    print("=" * 70)
    print("Starting FastAPI Backend Server...")
    print("=" * 70)
    
    backend_path = r"d:\Python\DremThings\backend"
    os.chdir(backend_path)
    
    # Start backend in subprocess
    process = subprocess.Popen(
        [sys.executable, "main.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Wait for server to start
    print("Waiting for backend to initialize...")
    time.sleep(5)
    
    return process


def run_tests():
    """Run the API test"""
    print("\n" + "=" * 70)
    print("Running API Integration Tests...")
    print("=" * 70 + "\n")
    
    test_path = r"d:\Python\DremThings\backend\test_complete_flow.py"
    
    result = subprocess.run(
        [sys.executable, test_path],
        capture_output=False
    )
    
    return result.returncode


if __name__ == "__main__":
    backend_process = None
    try:
        # Start backend
        backend_process = start_backend()
        
        # Run tests
        exit_code = run_tests()
        
        sys.exit(exit_code)
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
    finally:
        # Cleanup
        if backend_process:
            print("\nShutting down backend server...")
            backend_process.terminate()
            backend_process.wait(timeout=5)
