#include <errno.h>
#include <inttypes.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef _WIN32
#include <windows.h>
#else
#include <dlfcn.h>
#include <time.h>
#endif

typedef intptr_t cl_intptr_t;
typedef uintptr_t cl_uintptr_t;
typedef cl_uintptr_t cl_bitfield;
typedef cl_bitfield cl_device_type;
typedef cl_bitfield cl_mem_flags;
typedef cl_bitfield cl_command_queue_properties;
typedef uint32_t cl_uint;
typedef int32_t cl_int;
typedef uint64_t cl_ulong;
typedef uint8_t cl_bool;

typedef struct _cl_platform_id *cl_platform_id;
typedef struct _cl_device_id *cl_device_id;
typedef struct _cl_context *cl_context;
typedef struct _cl_command_queue *cl_command_queue;
typedef struct _cl_mem *cl_mem;
typedef struct _cl_program *cl_program;
typedef struct _cl_kernel *cl_kernel;
typedef struct _cl_event *cl_event;
typedef cl_uint cl_platform_info;
typedef cl_uint cl_device_info;
typedef cl_uint cl_program_build_info;
typedef cl_uint cl_kernel_work_group_info;

#define CL_SUCCESS 0
#define CL_FALSE 0
#define CL_TRUE 1
#define CL_DEVICE_TYPE_DEFAULT (1u << 0)
#define CL_DEVICE_TYPE_CPU (1u << 1)
#define CL_DEVICE_TYPE_GPU (1u << 2)
#define CL_DEVICE_TYPE_ACCELERATOR (1u << 3)
#define CL_MEM_READ_ONLY (1u << 2)
#define CL_MEM_WRITE_ONLY (1u << 1)
#define CL_MEM_COPY_HOST_PTR (1u << 5)
#define CL_QUEUE_PROFILING_ENABLE (1u << 1)
#define CL_PROGRAM_BUILD_LOG 0x1183
#define CL_DEVICE_NAME 0x102B
#define CL_DEVICE_VENDOR 0x102C
#define CL_DEVICE_MAX_COMPUTE_UNITS 0x1002
#define CL_DEVICE_MAX_WORK_GROUP_SIZE 0x1004
#define CL_PLATFORM_NAME 0x0902

typedef cl_int (*PFN_clGetPlatformIDs)(cl_uint, cl_platform_id *, cl_uint *);
typedef cl_int (*PFN_clGetPlatformInfo)(cl_platform_id, cl_platform_info, size_t, void *, size_t *);
typedef cl_int (*PFN_clGetDeviceIDs)(cl_platform_id, cl_device_type, cl_uint, cl_device_id *, cl_uint *);
typedef cl_int (*PFN_clGetDeviceInfo)(cl_device_id, cl_device_info, size_t, void *, size_t *);
typedef cl_context (*PFN_clCreateContext)(const cl_intptr_t *, cl_uint, const cl_device_id *, void *, void *, cl_int *);
typedef cl_command_queue (*PFN_clCreateCommandQueue)(cl_context, cl_device_id, cl_command_queue_properties, cl_int *);
typedef cl_mem (*PFN_clCreateBuffer)(cl_context, cl_mem_flags, size_t, void *, cl_int *);
typedef cl_program (*PFN_clCreateProgramWithSource)(cl_context, cl_uint, const char **, const size_t *, cl_int *);
typedef cl_int (*PFN_clBuildProgram)(cl_program, cl_uint, const cl_device_id *, const char *, void *, void *);
typedef cl_int (*PFN_clGetProgramBuildInfo)(cl_program, cl_device_id, cl_program_build_info, size_t, void *, size_t *);
typedef cl_kernel (*PFN_clCreateKernel)(cl_program, const char *, cl_int *);
typedef cl_int (*PFN_clSetKernelArg)(cl_kernel, cl_uint, size_t, const void *);
typedef cl_int (*PFN_clEnqueueWriteBuffer)(cl_command_queue, cl_mem, cl_bool, size_t, size_t, const void *, cl_uint, const cl_event *, cl_event *);
typedef cl_int (*PFN_clEnqueueReadBuffer)(cl_command_queue, cl_mem, cl_bool, size_t, size_t, void *, cl_uint, const cl_event *, cl_event *);
typedef cl_int (*PFN_clEnqueueNDRangeKernel)(cl_command_queue, cl_kernel, cl_uint, const size_t *, const size_t *, const size_t *, cl_uint, const cl_event *, cl_event *);
typedef cl_int (*PFN_clFinish)(cl_command_queue);
typedef cl_int (*PFN_clReleaseMemObject)(cl_mem);
typedef cl_int (*PFN_clReleaseKernel)(cl_kernel);
typedef cl_int (*PFN_clReleaseProgram)(cl_program);
typedef cl_int (*PFN_clReleaseCommandQueue)(cl_command_queue);
typedef cl_int (*PFN_clReleaseContext)(cl_context);

typedef struct {
  PFN_clGetPlatformIDs clGetPlatformIDs;
  PFN_clGetPlatformInfo clGetPlatformInfo;
  PFN_clGetDeviceIDs clGetDeviceIDs;
  PFN_clGetDeviceInfo clGetDeviceInfo;
  PFN_clCreateContext clCreateContext;
  PFN_clCreateCommandQueue clCreateCommandQueue;
  PFN_clCreateBuffer clCreateBuffer;
  PFN_clCreateProgramWithSource clCreateProgramWithSource;
  PFN_clBuildProgram clBuildProgram;
  PFN_clGetProgramBuildInfo clGetProgramBuildInfo;
  PFN_clCreateKernel clCreateKernel;
  PFN_clSetKernelArg clSetKernelArg;
  PFN_clEnqueueWriteBuffer clEnqueueWriteBuffer;
  PFN_clEnqueueReadBuffer clEnqueueReadBuffer;
  PFN_clEnqueueNDRangeKernel clEnqueueNDRangeKernel;
  PFN_clFinish clFinish;
  PFN_clReleaseMemObject clReleaseMemObject;
  PFN_clReleaseKernel clReleaseKernel;
  PFN_clReleaseProgram clReleaseProgram;
  PFN_clReleaseCommandQueue clReleaseCommandQueue;
  PFN_clReleaseContext clReleaseContext;
} cl_api;

static cl_api cl;

#ifdef _WIN32
static uint64_t now_ms(void) {
  FILETIME ft;
  ULARGE_INTEGER uli;
  GetSystemTimeAsFileTime(&ft);
  uli.LowPart = ft.dwLowDateTime;
  uli.HighPart = ft.dwHighDateTime;
  return (uli.QuadPart / 10000ull) - 11644473600000ull;
}
#else
static uint64_t now_ms(void) {
  struct timespec ts;
  clock_gettime(CLOCK_REALTIME, &ts);
  return (uint64_t)ts.tv_sec * 1000ull + (uint64_t)ts.tv_nsec / 1000000ull;
}
#endif

static void fatal_cl(const char *what, cl_int err) {
  fprintf(stderr, "%s failed: %d\n", what, err);
  exit(2);
}

static void *opencl_sym(void *lib, const char *name) {
#ifdef _WIN32
  void *sym = (void *)GetProcAddress((HMODULE)lib, name);
#else
  void *sym = dlsym(lib, name);
#endif
  if (!sym) {
    fprintf(stderr, "missing OpenCL symbol: %s\n", name);
    exit(2);
  }
  return sym;
}

static void load_opencl(void) {
#ifdef _WIN32
  void *lib = LoadLibraryA("OpenCL.dll");
#else
  void *lib = dlopen("libOpenCL.so", RTLD_NOW);
  if (!lib) lib = dlopen("libOpenCL.so.1", RTLD_NOW);
#endif
  if (!lib) {
    fprintf(stderr, "OpenCL runtime not found\n");
    exit(2);
  }
  cl.clGetPlatformIDs = (PFN_clGetPlatformIDs)opencl_sym(lib, "clGetPlatformIDs");
  cl.clGetPlatformInfo = (PFN_clGetPlatformInfo)opencl_sym(lib, "clGetPlatformInfo");
  cl.clGetDeviceIDs = (PFN_clGetDeviceIDs)opencl_sym(lib, "clGetDeviceIDs");
  cl.clGetDeviceInfo = (PFN_clGetDeviceInfo)opencl_sym(lib, "clGetDeviceInfo");
  cl.clCreateContext = (PFN_clCreateContext)opencl_sym(lib, "clCreateContext");
  cl.clCreateCommandQueue = (PFN_clCreateCommandQueue)opencl_sym(lib, "clCreateCommandQueue");
  cl.clCreateBuffer = (PFN_clCreateBuffer)opencl_sym(lib, "clCreateBuffer");
  cl.clCreateProgramWithSource = (PFN_clCreateProgramWithSource)opencl_sym(lib, "clCreateProgramWithSource");
  cl.clBuildProgram = (PFN_clBuildProgram)opencl_sym(lib, "clBuildProgram");
  cl.clGetProgramBuildInfo = (PFN_clGetProgramBuildInfo)opencl_sym(lib, "clGetProgramBuildInfo");
  cl.clCreateKernel = (PFN_clCreateKernel)opencl_sym(lib, "clCreateKernel");
  cl.clSetKernelArg = (PFN_clSetKernelArg)opencl_sym(lib, "clSetKernelArg");
  cl.clEnqueueWriteBuffer = (PFN_clEnqueueWriteBuffer)opencl_sym(lib, "clEnqueueWriteBuffer");
  cl.clEnqueueReadBuffer = (PFN_clEnqueueReadBuffer)opencl_sym(lib, "clEnqueueReadBuffer");
  cl.clEnqueueNDRangeKernel = (PFN_clEnqueueNDRangeKernel)opencl_sym(lib, "clEnqueueNDRangeKernel");
  cl.clFinish = (PFN_clFinish)opencl_sym(lib, "clFinish");
  cl.clReleaseMemObject = (PFN_clReleaseMemObject)opencl_sym(lib, "clReleaseMemObject");
  cl.clReleaseKernel = (PFN_clReleaseKernel)opencl_sym(lib, "clReleaseKernel");
  cl.clReleaseProgram = (PFN_clReleaseProgram)opencl_sym(lib, "clReleaseProgram");
  cl.clReleaseCommandQueue = (PFN_clReleaseCommandQueue)opencl_sym(lib, "clReleaseCommandQueue");
  cl.clReleaseContext = (PFN_clReleaseContext)opencl_sym(lib, "clReleaseContext");
}

static int hexval(char c) {
  if (c >= '0' && c <= '9') return c - '0';
  if (c >= 'a' && c <= 'f') return c - 'a' + 10;
  if (c >= 'A' && c <= 'F') return c - 'A' + 10;
  return -1;
}

static int parse_hex(const char *hex, uint8_t *out, size_t *out_len) {
  size_t n = strlen(hex);
  if ((n & 1u) || n / 2 > 64) return -1;
  for (size_t i = 0; i < n / 2; ++i) {
    int hi = hexval(hex[i * 2]);
    int lo = hexval(hex[i * 2 + 1]);
    if (hi < 0 || lo < 0) return -1;
    out[i] = (uint8_t)((hi << 4) | lo);
  }
  *out_len = n / 2;
  return 0;
}

static uint64_t parse_u64(const char *s) {
  errno = 0;
  uint64_t v = strtoull(s, NULL, 10);
  if (errno) {
    fprintf(stderr, "bad integer: %s\n", s);
    exit(2);
  }
  return v;
}

static const char *kernel_source =
"__constant uint k[64] = {\n"
"  0x428a2f98u,0x71374491u,0xb5c0fbcfu,0xe9b5dba5u,0x3956c25bu,0x59f111f1u,0x923f82a4u,0xab1c5ed5u,\n"
"  0xd807aa98u,0x12835b01u,0x243185beu,0x550c7dc3u,0x72be5d74u,0x80deb1feu,0x9bdc06a7u,0xc19bf174u,\n"
"  0xe49b69c1u,0xefbe4786u,0x0fc19dc6u,0x240ca1ccu,0x2de92c6fu,0x4a7484aau,0x5cb0a9dcu,0x76f988dau,\n"
"  0x983e5152u,0xa831c66du,0xb00327c8u,0xbf597fc7u,0xc6e00bf3u,0xd5a79147u,0x06ca6351u,0x14292967u,\n"
"  0x27b70a85u,0x2e1b2138u,0x4d2c6dfcu,0x53380d13u,0x650a7354u,0x766a0abbu,0x81c2c92eu,0x92722c85u,\n"
"  0xa2bfe8a1u,0xa81a664bu,0xc24b8b70u,0xc76c51a3u,0xd192e819u,0xd6990624u,0xf40e3585u,0x106aa070u,\n"
"  0x19a4c116u,0x1e376c08u,0x2748774cu,0x34b0bcb5u,0x391c0cb3u,0x4ed8aa4au,0x5b9cca4fu,0x682e6ff3u,\n"
"  0x748f82eeu,0x78a5636fu,0x84c87814u,0x8cc70208u,0x90befffau,0xa4506cebu,0xbef9a3f7u,0xc67178f2u };\n"
"uint rotr(uint x, uint n) { return (x >> n) | (x << (32u - n)); }\n"
"uint ch(uint x, uint y, uint z) { return (x & y) ^ (~x & z); }\n"
"uint maj(uint x, uint y, uint z) { return (x & y) ^ (x & z) ^ (y & z); }\n"
"uint ep0(uint x) { return rotr(x, 2u) ^ rotr(x, 13u) ^ rotr(x, 22u); }\n"
"uint ep1(uint x) { return rotr(x, 6u) ^ rotr(x, 11u) ^ rotr(x, 25u); }\n"
"uint sig0(uint x) { return rotr(x, 7u) ^ rotr(x, 18u) ^ (x >> 3u); }\n"
"uint sig1(uint x) { return rotr(x, 17u) ^ rotr(x, 19u) ^ (x >> 10u); }\n"
"void sha256_transform(uint state[8], const uchar block[64]) {\n"
"  uint w[64];\n"
"  for (int i = 0; i < 16; ++i) {\n"
"    int j = i * 4;\n"
"    w[i] = ((uint)block[j] << 24) | ((uint)block[j + 1] << 16) | ((uint)block[j + 2] << 8) | (uint)block[j + 3];\n"
"  }\n"
"  for (int i = 16; i < 64; ++i) w[i] = sig1(w[i - 2]) + w[i - 7] + sig0(w[i - 15]) + w[i - 16];\n"
"  uint a = state[0], b = state[1], c = state[2], d = state[3];\n"
"  uint e = state[4], f = state[5], g = state[6], h = state[7];\n"
"  for (int i = 0; i < 64; ++i) {\n"
"    uint t1 = h + ep1(e) + ch(e, f, g) + k[i] + w[i];\n"
"    uint t2 = ep0(a) + maj(a, b, c);\n"
"    h = g; g = f; f = e; e = d + t1; d = c; c = b; b = a; a = t1 + t2;\n"
"  }\n"
"  state[0] += a; state[1] += b; state[2] += c; state[3] += d;\n"
"  state[4] += e; state[5] += f; state[6] += g; state[7] += h;\n"
"}\n"
"int trailing_zero_bits(const uchar hash[32]) {\n"
"  int bits = 0;\n"
"  for (int i = 31; i >= 0; --i) {\n"
"    uchar b = hash[i];\n"
"    if (b == 0) { bits += 8; continue; }\n"
"    for (int j = 0; j < 8; ++j) {\n"
"      if ((b & (1u << j)) == 0) bits++;\n"
"      else return bits;\n"
"    }\n"
"  }\n"
"  return bits;\n"
"}\n"
"__kernel void mine(__global const uchar *prefix, uint prefix_len, uint difficulty, ulong start_nonce,\n"
"                   __global int *found_flag, __global ulong *found_nonce, __global uchar *found_digest) {\n"
"  ulong gid = (ulong)get_global_id(0);\n"
"  ulong nonce = start_nonce + gid;\n"
"  uchar msg[128];\n"
"  uchar block[64];\n"
"  uchar hash[32];\n"
"  uint state[8];\n"
"  uint total_len = prefix_len + 8u;\n"
"  for (int i = 0; i < 128; ++i) msg[i] = 0;\n"
"  for (uint i = 0; i < prefix_len; ++i) msg[i] = prefix[i];\n"
"  ulong n = nonce;\n"
"  for (int i = 0; i < 8; ++i) { msg[prefix_len + (uint)i] = (uchar)(n & 0xffu); n >>= 8; }\n"
"  msg[total_len] = 0x80;\n"
"  ulong bitlen = (ulong)total_len * 8ul;\n"
"  int blocks = (total_len + 1u + 8u <= 64u) ? 1 : 2;\n"
"  int tail = blocks * 64;\n"
"  msg[tail - 8] = (uchar)(bitlen >> 56);\n"
"  msg[tail - 7] = (uchar)(bitlen >> 48);\n"
"  msg[tail - 6] = (uchar)(bitlen >> 40);\n"
"  msg[tail - 5] = (uchar)(bitlen >> 32);\n"
"  msg[tail - 4] = (uchar)(bitlen >> 24);\n"
"  msg[tail - 3] = (uchar)(bitlen >> 16);\n"
"  msg[tail - 2] = (uchar)(bitlen >> 8);\n"
"  msg[tail - 1] = (uchar)(bitlen);\n"
"  state[0] = 0x6a09e667u; state[1] = 0xbb67ae85u; state[2] = 0x3c6ef372u; state[3] = 0xa54ff53au;\n"
"  state[4] = 0x510e527fu; state[5] = 0x9b05688cu; state[6] = 0x1f83d9abu; state[7] = 0x5be0cd19u;\n"
"  for (int b = 0; b < blocks; ++b) {\n"
"    for (int i = 0; i < 64; ++i) block[i] = msg[b * 64 + i];\n"
"    sha256_transform(state, block);\n"
"  }\n"
"  for (int i = 0; i < 4; ++i) {\n"
"    hash[i] = (uchar)((state[0] >> (24 - i * 8)) & 0xffu);\n"
"    hash[i + 4] = (uchar)((state[1] >> (24 - i * 8)) & 0xffu);\n"
"    hash[i + 8] = (uchar)((state[2] >> (24 - i * 8)) & 0xffu);\n"
"    hash[i + 12] = (uchar)((state[3] >> (24 - i * 8)) & 0xffu);\n"
"    hash[i + 16] = (uchar)((state[4] >> (24 - i * 8)) & 0xffu);\n"
"    hash[i + 20] = (uchar)((state[5] >> (24 - i * 8)) & 0xffu);\n"
"    hash[i + 24] = (uchar)((state[6] >> (24 - i * 8)) & 0xffu);\n"
"    hash[i + 28] = (uchar)((state[7] >> (24 - i * 8)) & 0xffu);\n"
"  }\n"
"  if ((uint)trailing_zero_bits(hash) >= difficulty) {\n"
"    if (atomic_cmpxchg(found_flag, 0, 1) == 0) {\n"
"      found_nonce[0] = nonce;\n"
"      for (int i = 0; i < 32; ++i) found_digest[i] = hash[i];\n"
"    }\n"
"  }\n"
"}\n";

static void get_info_string_platform(cl_platform_id platform, cl_platform_info what, char *out, size_t out_len) {
  size_t size = 0;
  if (cl.clGetPlatformInfo(platform, what, out_len, out, &size) != CL_SUCCESS || size == 0) {
    snprintf(out, out_len, "unknown");
  }
}

static void get_info_string_device(cl_device_id device, cl_device_info what, char *out, size_t out_len) {
  size_t size = 0;
  if (cl.clGetDeviceInfo(device, what, out_len, out, &size) != CL_SUCCESS || size == 0) {
    snprintf(out, out_len, "unknown");
  }
}

int main(int argc, char **argv) {
  uint8_t prefix[64] = {0};
  size_t prefix_len = 0;
  const char *prefix_hex = NULL;
  int difficulty = 0;
  uint64_t start_nonce = 0;
  uint64_t cutoff_ms = 0;
  uint64_t progress_ms = 1000;
  size_t batch_size = 1u << 20;
  size_t local_size = 256;
  uint32_t platform_index = 0;
  uint32_t device_index = 0;

  for (int i = 1; i < argc; ++i) {
    if (!strcmp(argv[i], "--prefix") && i + 1 < argc) prefix_hex = argv[++i];
    else if (!strcmp(argv[i], "--difficulty") && i + 1 < argc) difficulty = atoi(argv[++i]);
    else if (!strcmp(argv[i], "--start") && i + 1 < argc) start_nonce = parse_u64(argv[++i]);
    else if (!strcmp(argv[i], "--cutoff-ms") && i + 1 < argc) cutoff_ms = parse_u64(argv[++i]);
    else if (!strcmp(argv[i], "--progress-ms") && i + 1 < argc) progress_ms = parse_u64(argv[++i]);
    else if (!strcmp(argv[i], "--batch-size") && i + 1 < argc) batch_size = (size_t)parse_u64(argv[++i]);
    else if (!strcmp(argv[i], "--local-size") && i + 1 < argc) local_size = (size_t)parse_u64(argv[++i]);
    else if (!strcmp(argv[i], "--platform-index") && i + 1 < argc) platform_index = (uint32_t)parse_u64(argv[++i]);
    else if (!strcmp(argv[i], "--device-index") && i + 1 < argc) device_index = (uint32_t)parse_u64(argv[++i]);
  }

  if (!prefix_hex || parse_hex(prefix_hex, prefix, &prefix_len) || difficulty <= 0 || batch_size == 0 || local_size == 0) {
    fprintf(stderr, "usage: rpow-gpu-miner --prefix HEX --difficulty N [--start N] [--cutoff-ms N] [--batch-size N] [--local-size N]\n");
    return 2;
  }

  load_opencl();

  cl_uint platform_count = 0;
  cl_int err = cl.clGetPlatformIDs(0, NULL, &platform_count);
  if (err != CL_SUCCESS || platform_count == 0) fatal_cl("clGetPlatformIDs", err ? err : -1);
  cl_platform_id *platforms = (cl_platform_id *)calloc(platform_count, sizeof(*platforms));
  if (!platforms) return 2;
  err = cl.clGetPlatformIDs(platform_count, platforms, NULL);
  if (err != CL_SUCCESS) fatal_cl("clGetPlatformIDs(list)", err);
  if (platform_index >= platform_count) {
    fprintf(stderr, "platform-index out of range\n");
    return 2;
  }
  cl_platform_id platform = platforms[platform_index];

  cl_uint device_count = 0;
  err = cl.clGetDeviceIDs(platform, CL_DEVICE_TYPE_GPU, 0, NULL, &device_count);
  if (err != CL_SUCCESS || device_count == 0) {
    err = cl.clGetDeviceIDs(platform, CL_DEVICE_TYPE_ACCELERATOR, 0, NULL, &device_count);
    if (err != CL_SUCCESS || device_count == 0) {
      fprintf(stderr, "no OpenCL GPU/accelerator found on selected platform\n");
      return 2;
    }
  }
  cl_device_id *devices = (cl_device_id *)calloc(device_count, sizeof(*devices));
  if (!devices) return 2;
  err = cl.clGetDeviceIDs(platform, CL_DEVICE_TYPE_GPU, device_count, devices, NULL);
  if (err != CL_SUCCESS) err = cl.clGetDeviceIDs(platform, CL_DEVICE_TYPE_ACCELERATOR, device_count, devices, NULL);
  if (err != CL_SUCCESS) fatal_cl("clGetDeviceIDs(list)", err);
  if (device_index >= device_count) {
    fprintf(stderr, "device-index out of range\n");
    return 2;
  }
  cl_device_id device = devices[device_index];

  char platform_name[256] = {0};
  char device_name[256] = {0};
  char device_vendor[256] = {0};
  get_info_string_platform(platform, CL_PLATFORM_NAME, platform_name, sizeof(platform_name));
  get_info_string_device(device, CL_DEVICE_NAME, device_name, sizeof(device_name));
  get_info_string_device(device, CL_DEVICE_VENDOR, device_vendor, sizeof(device_vendor));

  size_t max_work_group_size = 0;
  cl_uint compute_units = 0;
  cl.clGetDeviceInfo(device, CL_DEVICE_MAX_WORK_GROUP_SIZE, sizeof(max_work_group_size), &max_work_group_size, NULL);
  cl.clGetDeviceInfo(device, CL_DEVICE_MAX_COMPUTE_UNITS, sizeof(compute_units), &compute_units, NULL);
  if (local_size > max_work_group_size && max_work_group_size > 0) local_size = max_work_group_size;
  if (batch_size < local_size) batch_size = local_size;
  if (batch_size % local_size != 0) batch_size = ((batch_size + local_size - 1) / local_size) * local_size;

  cl_context context = cl.clCreateContext(NULL, 1, &device, NULL, NULL, &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateContext", err);
  cl_command_queue queue = cl.clCreateCommandQueue(context, device, 0, &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateCommandQueue", err);

  const char *sources[] = { kernel_source };
  cl_program program = cl.clCreateProgramWithSource(context, 1, sources, NULL, &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateProgramWithSource", err);
  err = cl.clBuildProgram(program, 1, &device, NULL, NULL, NULL);
  if (err != CL_SUCCESS) {
    size_t log_size = 0;
    cl.clGetProgramBuildInfo(program, device, CL_PROGRAM_BUILD_LOG, 0, NULL, &log_size);
    char *build_log = (char *)calloc(log_size + 1, 1);
    if (build_log) {
      cl.clGetProgramBuildInfo(program, device, CL_PROGRAM_BUILD_LOG, log_size, build_log, NULL);
      fprintf(stderr, "%s\n", build_log);
    }
    fatal_cl("clBuildProgram", err);
  }

  cl_kernel kernel = cl.clCreateKernel(program, "mine", &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateKernel", err);

  cl_mem prefix_buf = cl.clCreateBuffer(context, CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR, prefix_len, prefix, &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateBuffer(prefix)", err);
  cl_mem found_flag_buf = cl.clCreateBuffer(context, CL_MEM_WRITE_ONLY, sizeof(cl_int), NULL, &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateBuffer(flag)", err);
  cl_mem found_nonce_buf = cl.clCreateBuffer(context, CL_MEM_WRITE_ONLY, sizeof(cl_ulong), NULL, &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateBuffer(nonce)", err);
  cl_mem found_digest_buf = cl.clCreateBuffer(context, CL_MEM_WRITE_ONLY, 32, NULL, &err);
  if (err != CL_SUCCESS) fatal_cl("clCreateBuffer(digest)", err);

  err = cl.clSetKernelArg(kernel, 0, sizeof(prefix_buf), &prefix_buf);
  err |= cl.clSetKernelArg(kernel, 1, sizeof(cl_uint), &(cl_uint){ (cl_uint)prefix_len });
  err |= cl.clSetKernelArg(kernel, 2, sizeof(cl_uint), &(cl_uint){ (cl_uint)difficulty });
  err |= cl.clSetKernelArg(kernel, 4, sizeof(found_flag_buf), &found_flag_buf);
  err |= cl.clSetKernelArg(kernel, 5, sizeof(found_nonce_buf), &found_nonce_buf);
  err |= cl.clSetKernelArg(kernel, 6, sizeof(found_digest_buf), &found_digest_buf);
  if (err != CL_SUCCESS) fatal_cl("clSetKernelArg(fixed)", err);

  uint64_t started = now_ms();
  uint64_t last_progress = started;
  uint64_t next_nonce = start_nonce;
  uint64_t total_hashes = 0;
  uint8_t digest[32] = {0};

  for (;;) {
    if (cutoff_ms && now_ms() >= cutoff_ms) {
      printf("{\"type\":\"expired\",\"hashes\":\"%" PRIu64 "\"}\n", total_hashes);
      fflush(stdout);
      break;
    }

    cl_int found_flag = 0;
    cl_ulong found_nonce = 0;
    err = cl.clEnqueueWriteBuffer(queue, found_flag_buf, CL_TRUE, 0, sizeof(found_flag), &found_flag, 0, NULL, NULL);
    err |= cl.clEnqueueWriteBuffer(queue, found_nonce_buf, CL_TRUE, 0, sizeof(found_nonce), &found_nonce, 0, NULL, NULL);
    if (err != CL_SUCCESS) fatal_cl("clEnqueueWriteBuffer(reset)", err);

    err = cl.clSetKernelArg(kernel, 3, sizeof(cl_ulong), &next_nonce);
    if (err != CL_SUCCESS) fatal_cl("clSetKernelArg(start)", err);

    size_t global_size = batch_size;
    err = cl.clEnqueueNDRangeKernel(queue, kernel, 1, NULL, &global_size, &local_size, 0, NULL, NULL);
    if (err != CL_SUCCESS) fatal_cl("clEnqueueNDRangeKernel", err);
    err = cl.clFinish(queue);
    if (err != CL_SUCCESS) fatal_cl("clFinish", err);

    total_hashes += (uint64_t)batch_size;
    err = cl.clEnqueueReadBuffer(queue, found_flag_buf, CL_TRUE, 0, sizeof(found_flag), &found_flag, 0, NULL, NULL);
    if (err != CL_SUCCESS) fatal_cl("clEnqueueReadBuffer(flag)", err);

    if (found_flag) {
      err = cl.clEnqueueReadBuffer(queue, found_nonce_buf, CL_TRUE, 0, sizeof(found_nonce), &found_nonce, 0, NULL, NULL);
      err |= cl.clEnqueueReadBuffer(queue, found_digest_buf, CL_TRUE, 0, sizeof(digest), digest, 0, NULL, NULL);
      if (err != CL_SUCCESS) fatal_cl("clEnqueueReadBuffer(result)", err);
      printf("{\"type\":\"found\",\"solution_nonce\":\"%" PRIu64 "\",\"hashes\":\"%" PRIu64 "\",\"digest\":\"", (uint64_t)found_nonce, total_hashes);
      for (int i = 0; i < 32; ++i) printf("%02x", digest[i]);
      printf("\",\"device\":\"%s / %s\",\"batch_size\":\"%zu\",\"local_size\":\"%zu\"}\n", device_vendor, device_name, batch_size, local_size);
      fflush(stdout);
      break;
    }

    next_nonce += (uint64_t)batch_size;
    uint64_t now = now_ms();
    if (now - last_progress >= progress_ms) {
      printf("{\"type\":\"progress\",\"hashes\":\"%" PRIu64 "\",\"nonce\":\"%" PRIu64 "\",\"device\":\"%s / %s\",\"batch_size\":\"%zu\",\"local_size\":\"%zu\"}\n",
        total_hashes, next_nonce, device_vendor, device_name, batch_size, local_size);
      fflush(stdout);
      last_progress = now;
    }
  }

  cl.clReleaseMemObject(found_digest_buf);
  cl.clReleaseMemObject(found_nonce_buf);
  cl.clReleaseMemObject(found_flag_buf);
  cl.clReleaseMemObject(prefix_buf);
  cl.clReleaseKernel(kernel);
  cl.clReleaseProgram(program);
  cl.clReleaseCommandQueue(queue);
  cl.clReleaseContext(context);
  free(devices);
  free(platforms);
  return 0;
}
